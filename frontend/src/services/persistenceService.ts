import { invoke } from '@tauri-apps/api/core';
import type { GameState } from '../types';

export interface SaveFileInfo {
  id: string;
  player_level: number;
  current_round: number;
  score: number;
  last_modified: number; // Unix timestamp
  file_path: string;
}

export class PersistenceService {
  /**
   * Save game data to a persistent file
   */
  static async saveGameToFile(state: GameState): Promise<string> {
    try {
      return await invoke('save_game_to_file', { state });
    } catch (error) {
      throw new Error(`Failed to save game to file: ${error}`);
    }
  }

  /**
   * Load game data from a persistent file
   */
  static async loadGameFromFile(saveId: string): Promise<GameState> {
    try {
      return await invoke('load_game_from_file', { saveId });
    } catch (error) {
      throw new Error(`Failed to load game from file: ${error}`);
    }
  }

  /**
   * List all available save files
   */
  static async listSaveFiles(): Promise<SaveFileInfo[]> {
    try {
      return await invoke('list_save_files');
    } catch (error) {
      throw new Error(`Failed to list save files: ${error}`);
    }
  }

  /**
   * Delete a save file
   */
  static async deleteSaveFile(saveId: string): Promise<void> {
    try {
      await invoke('delete_save_file', { saveId });
    } catch (error) {
      throw new Error(`Failed to delete save file: ${error}`);
    }
  }

  /**
   * Generate a unique save ID
   */
  static generateSaveId(): string {
    return `game_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Format timestamp for display
   */
  static formatSaveDate(timestamp: number): string {
    return new Date(timestamp * 1000).toLocaleString();
  }
}