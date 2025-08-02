import { invoke } from '@tauri-apps/api/core';
import type { GameState, CardId } from '../types';

export interface SynergyResult {
  active_synergies: Record<string, number>;
  total_bonus: number;
}

export class CardService {
  /**
   * Play a card from the player's hand
   */
  static async playCard(cardId: CardId, state: GameState): Promise<GameState> {
    try {
      return await invoke('play_card', { cardId, state });
    } catch (error) {
      throw new Error(`Failed to play card: ${error}`);
    }
  }

  /**
   * Buy a card from the shop
   */
  static async buyCard(cardId: CardId, state: GameState): Promise<GameState> {
    try {
      return await invoke('buy_card', { cardId, state });
    } catch (error) {
      throw new Error(`Failed to buy card: ${error}`);
    }
  }

  /**
   * Draw cards from deck to hand
   */
  static async drawCards(count: number, state: GameState): Promise<GameState> {
    try {
      return await invoke('draw_cards', { count, state });
    } catch (error) {
      throw new Error(`Failed to draw cards: ${error}`);
    }
  }

  /**
   * Discard a card from hand
   */
  static async discardCard(cardId: CardId, state: GameState): Promise<GameState> {
    try {
      return await invoke('discard_card', { cardId, state });
    } catch (error) {
      throw new Error(`Failed to discard card: ${error}`);
    }
  }

  /**
   * Refresh the shop with new cards (costs currency)
   */
  static async refreshShop(state: GameState): Promise<GameState> {
    try {
      return await invoke('refresh_shop', { state });
    } catch (error) {
      throw new Error(`Failed to refresh shop: ${error}`);
    }
  }

  /**
   * Calculate synergy bonuses for current hand
   */
  static async calculateSynergies(state: GameState): Promise<SynergyResult> {
    try {
      return await invoke('calculate_synergies', { state });
    } catch (error) {
      throw new Error(`Failed to calculate synergies: ${error}`);
    }
  }
}