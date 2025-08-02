use crate::types::*;
use std::fs;
use std::path::PathBuf;

/// Save game data to persistent storage
#[tauri::command]
pub async fn save_game_to_file(
    state: GameState,
    app_handle: tauri::AppHandle,
) -> Result<String, GameError> {
    log::info!("Saving game {} to file", state.id);

    let save_path = get_save_path(&app_handle, &state.id)?;

    // Serialize game state to JSON
    let json_data = serde_json::to_string_pretty(&state)
        .map_err(|e| GameError::SerializationError(e.to_string()))?;

    // Write to file
    fs::write(&save_path, json_data).map_err(|e| GameError::PersistenceError(e.to_string()))?;

    let save_path_str = save_path.to_string_lossy().to_string();
    log::info!("Game saved to: {}", save_path_str);

    Ok(save_path_str)
}

/// Load game data from persistent storage
#[tauri::command]
pub async fn load_game_from_file(
    save_id: String,
    app_handle: tauri::AppHandle,
) -> Result<GameState, GameError> {
    log::info!("Loading game {} from file", save_id);

    let save_path = get_save_path(&app_handle, &save_id)?;

    // Check if file exists
    if !save_path.exists() {
        return Err(GameError::PersistenceError(format!(
            "Save file not found: {}",
            save_path.display()
        )));
    }

    // Read file
    let json_data =
        fs::read_to_string(&save_path).map_err(|e| GameError::PersistenceError(e.to_string()))?;

    // Deserialize game state
    let game_state: GameState = serde_json::from_str(&json_data)
        .map_err(|e| GameError::SerializationError(e.to_string()))?;

    log::info!("Game loaded from: {}", save_path.display());

    Ok(game_state)
}

/// List all available save files
#[tauri::command]
pub async fn list_save_files(app_handle: tauri::AppHandle) -> Result<Vec<SaveFileInfo>, GameError> {
    log::info!("Listing save files");

    let saves_dir = get_saves_directory(&app_handle)?;

    if !saves_dir.exists() {
        return Ok(Vec::new());
    }

    let mut save_files = Vec::new();

    // Read directory entries
    let entries =
        fs::read_dir(&saves_dir).map_err(|e| GameError::PersistenceError(e.to_string()))?;

    for entry in entries {
        let entry = entry.map_err(|e| GameError::PersistenceError(e.to_string()))?;
        let path = entry.path();

        if path.extension().and_then(|s| s.to_str()) == Some("json") {
            // Try to read basic info from the save file
            if let Ok(json_data) = fs::read_to_string(&path) {
                if let Ok(game_state) = serde_json::from_str::<GameState>(&json_data) {
                    let metadata = entry
                        .metadata()
                        .map_err(|e| GameError::PersistenceError(e.to_string()))?;

                    let save_info = SaveFileInfo {
                        id: game_state.id,
                        player_level: game_state.player.level,
                        current_round: game_state.current_round.round_number,
                        score: game_state.score.cw3_points,
                        last_modified: metadata
                            .modified()
                            .unwrap_or(std::time::SystemTime::UNIX_EPOCH)
                            .duration_since(std::time::SystemTime::UNIX_EPOCH)
                            .unwrap_or_default()
                            .as_secs(),
                        file_path: path.to_string_lossy().to_string(),
                    };

                    save_files.push(save_info);
                }
            }
        }
    }

    // Sort by last modified (newest first)
    save_files.sort_by(|a, b| b.last_modified.cmp(&a.last_modified));

    log::info!("Found {} save files", save_files.len());

    Ok(save_files)
}

/// Delete a save file
#[tauri::command]
pub async fn delete_save_file(
    save_id: String,
    app_handle: tauri::AppHandle,
) -> Result<(), GameError> {
    log::info!("Deleting save file for game {}", save_id);

    let save_path = get_save_path(&app_handle, &save_id)?;

    if save_path.exists() {
        fs::remove_file(&save_path).map_err(|e| GameError::PersistenceError(e.to_string()))?;
        log::info!("Save file deleted: {}", save_path.display());
    } else {
        log::warn!("Save file not found: {}", save_path.display());
    }

    Ok(())
}

/// Get the saves directory path
fn get_saves_directory(app_handle: &tauri::AppHandle) -> Result<PathBuf, GameError> {
    let app_data_dir = app_handle
        .path()
        .app_data_dir()
        .map_err(|e| GameError::PersistenceError(e.to_string()))?;

    let saves_dir = app_data_dir.join("saves");

    // Create directory if it doesn't exist
    if !saves_dir.exists() {
        fs::create_dir_all(&saves_dir).map_err(|e| GameError::PersistenceError(e.to_string()))?;
    }

    Ok(saves_dir)
}

/// Get the full path for a save file
fn get_save_path(app_handle: &tauri::AppHandle, save_id: &str) -> Result<PathBuf, GameError> {
    let saves_dir = get_saves_directory(app_handle)?;
    Ok(saves_dir.join(format!("{}.json", save_id)))
}

/// Information about a save file
#[derive(Debug, serde::Serialize, serde::Deserialize)]
pub struct SaveFileInfo {
    pub id: String,
    pub player_level: u32,
    pub current_round: u32,
    pub score: u32,
    pub last_modified: u64, // Unix timestamp
    pub file_path: String,
}
