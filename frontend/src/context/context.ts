import { createContext } from 'react';
import type { GameState, CardId } from '../types';

// Game context state
interface GameContextState {
  gameState: GameState | null;
  isLoading: boolean;
  error: string | null;
}

// Game context interface
export interface GameContextType extends GameContextState {
  // Game management
  startNewGame: (gameId?: string) => Promise<void>;
  loadGame: (saveId: string) => Promise<void>;
  saveGame: () => Promise<void>;
  clearGame: () => void;
  
  // Card actions
  playCard: (cardId: CardId) => Promise<void>;
  buyCard: (cardId: CardId) => Promise<void>;
  discardCard: (cardId: CardId) => Promise<void>;
  drawCards: (count: number) => Promise<void>;
  refreshShop: () => Promise<void>;
  
  // Round management
  endRound: () => Promise<boolean>;
  
  // UI helpers
  clearError: () => void;
}

// Create the context
export const GameContext = createContext<GameContextType | undefined>(undefined);