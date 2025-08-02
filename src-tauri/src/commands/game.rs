use crate::types::*;
use crate::game::*;

/// Create a new game with default settings
#[tauri::command]
pub async fn new_game(game_id: String) -> Result<GameState, GameError> {
    log::info!("Creating new game with ID: {}", game_id);
    
    let game_state = GameManager::new_game(game_id);
    
    Ok(game_state)
}

/// Load an existing game from storage
#[tauri::command]  
pub async fn load_game(save_id: String) -> Result<GameState, GameError> {
    log::info!("Loading game with ID: {}", save_id);
    
    // For now, return a new game - persistence will be implemented later
    // TODO: Implement actual save/load functionality
    let game_state = GameManager::new_game(save_id);
    
    Ok(game_state)
}

/// Save the current game state
#[tauri::command]
pub async fn save_game(state: GameState) -> Result<(), GameError> {
    log::info!("Saving game with ID: {}", state.id);
    
    // TODO: Implement actual save functionality
    // For now, just log that we received the state
    log::info!("Game state received - Round: {}, Score: {}", 
               state.current_round.round_number, 
               state.score.cw3_points);
    
    Ok(())
}

/// Get the current game state (for debugging/testing)
#[tauri::command]
pub async fn get_game_state(game_id: String) -> Result<GameState, GameError> {
    log::info!("Getting game state for ID: {}", game_id);
    
    // For now, return a new game - will be replaced with actual state management
    let game_state = GameManager::new_game(game_id);
    
    Ok(game_state)
}

/// End the current round and check if player passed
#[tauri::command]
pub async fn end_round(mut state: GameState) -> Result<(GameState, bool), GameError> {
    log::info!("Ending round {} for game {}", state.current_round.round_number, state.id);
    
    let result = GameManager::end_round(&mut state);
    let passed = matches!(result, RoundResult::Victory);
    
    // Update player stats
    if !passed {
        state.player.record_game(false, state.score.cw3_points, state.current_round.round_number);
    }
    
    Ok((state, passed))
}

/// Get game statistics and information
#[tauri::command]
pub async fn get_game_stats(state: GameState) -> Result<GameStats, GameError> {
    log::info!("Getting game stats for game {}", state.id);
    
    let total_score = GameManager::calculate_total_score(&state);
    let deck_stats = state.deck.get_stats();
    
    let stats = GameStats {
        total_score,
        rounds_completed: state.current_round.round_number.saturating_sub(1),
        cards_in_hand: state.hand.len(),
        cards_in_deck: state.deck.size(),
        currency: state.score.crymp_currency,
        player_level: state.player.level,
        win_rate: state.player.win_rate(),
        synergy_counts: deck_stats.synergy_distribution,
    };
    
    Ok(stats)
}

/// Game statistics structure
#[derive(Debug, serde::Serialize, serde::Deserialize)]
pub struct GameStats {
    pub total_score: u32,
    pub rounds_completed: u32,
    pub cards_in_hand: usize,
    pub cards_in_deck: usize,
    pub currency: u32,
    pub player_level: u32,
    pub win_rate: f32,
    pub synergy_counts: std::collections::HashMap<Synergy, usize>,
}