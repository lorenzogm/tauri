// Core modules
pub mod cards;
pub mod commands;
pub mod game;
pub mod types;

// Re-export commonly used types
pub use cards::*;
pub use commands::*;
pub use game::*;
pub use types::*;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            // Game state commands
            new_game,
            load_game,
            save_game,
            get_game_state,
            end_round,
            get_game_stats,
            // Card commands
            play_card,
            buy_card,
            draw_cards,
            discard_card,
            refresh_shop,
            calculate_synergies,
            // Persistence commands
            save_game_to_file,
            load_game_from_file,
            list_save_files,
            delete_save_file,
        ])
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
