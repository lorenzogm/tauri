import { invoke } from '@tauri-apps/api/core';
import type { GameState } from '../types';

export interface GameStats {
  total_score: number;
  rounds_completed: number;
  cards_in_hand: number;
  cards_in_deck: number;
  currency: number;
  player_level: number;
  win_rate: number;
  synergy_counts: Record<string, number>;
}

export class GameService {
  /**
   * Create a new game with the specified ID
   */
  static async newGame(gameId: string): Promise<GameState> {
    try {
      return await invoke('new_game', { gameId });
    } catch (error) {
      throw new Error(`Failed to create new game: ${error}`);
    }
  }

  /**
   * Load an existing game from memory/storage
   */
  static async loadGame(saveId: string): Promise<GameState> {
    try {
      return await invoke('load_game', { saveId });
    } catch (error) {
      throw new Error(`Failed to load game: ${error}`);
    }
  }

  /**
   * Save the current game state
   */
  static async saveGame(state: GameState): Promise<void> {
    try {
      await invoke('save_game', { state });
    } catch (error) {
      throw new Error(`Failed to save game: ${error}`);
    }
  }

  /**
   * Get the current game state (for debugging/testing)
   */
  static async getGameState(gameId: string): Promise<GameState> {
    try {
      return await invoke('get_game_state', { gameId });
    } catch (error) {
      throw new Error(`Failed to get game state: ${error}`);
    }
  }

  /**
   * End the current round and check if player passed
   * Returns the updated state and whether the round was passed
   */
  static async endRound(state: GameState): Promise<{ state: GameState; passed: boolean }> {
    try {
      const result = await invoke('end_round', { state }) as [GameState, boolean];
      return { state: result[0], passed: result[1] };
    } catch (error) {
      throw new Error(`Failed to end round: ${error}`);
    }
  }

  /**
   * Get comprehensive game statistics
   */
  static async getGameStats(state: GameState): Promise<GameStats> {
    try {
      return await invoke('get_game_stats', { state });
    } catch (error) {
      throw new Error(`Failed to get game stats: ${error}`);
    }
  }
}