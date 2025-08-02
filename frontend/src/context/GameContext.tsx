import { createContext, useContext, useReducer, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { GameState, CardId } from '../types';
import { GameService, CardService, PersistenceService } from '../services';

// Game context state
interface GameContextState {
  gameState: GameState | null;
  isLoading: boolean;
  error: string | null;
  isPlaying: boolean;
}

// Actions for the game state reducer
type GameAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_GAME_STATE'; payload: GameState }
  | { type: 'SET_PLAYING'; payload: boolean }
  | { type: 'CLEAR_GAME' };

// Game context interface
interface GameContextType extends GameContextState {
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
  
  // Utilities
  clearError: () => void;
}

// Initial state
const initialState: GameContextState = {
  gameState: null,
  isLoading: false,
  error: null,
  isPlaying: false,
};

// Reducer for managing game state
function gameReducer(state: GameContextState, action: GameAction): GameContextState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    case 'SET_GAME_STATE':
      return { ...state, gameState: action.payload, error: null };
    case 'SET_PLAYING':
      return { ...state, isPlaying: action.payload };
    case 'CLEAR_GAME':
      return { ...initialState };
    default:
      return state;
  }
}

// Create the context
const GameContext = createContext<GameContextType | undefined>(undefined);

// Provider component
interface GameProviderProps {
  children: ReactNode;
}

export function GameProvider({ children }: GameProviderProps) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Helper to handle async operations with error handling
  const handleAsync = useCallback(async (operation: () => Promise<void>) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
      await operation();
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'An unknown error occurred' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  // Game management functions
  const startNewGame = useCallback(async (gameId?: string) => {
    await handleAsync(async () => {
      const id = gameId || PersistenceService.generateSaveId();
      const gameState = await GameService.newGame(id);
      dispatch({ type: 'SET_GAME_STATE', payload: gameState });
      dispatch({ type: 'SET_PLAYING', payload: true });
    });
  }, [handleAsync]);

  const loadGame = useCallback(async (saveId: string) => {
    await handleAsync(async () => {
      const gameState = await PersistenceService.loadGameFromFile(saveId);
      dispatch({ type: 'SET_GAME_STATE', payload: gameState });
      dispatch({ type: 'SET_PLAYING', payload: !gameState.game_over });
    });
  }, [handleAsync]);

  const saveGame = useCallback(async () => {
    if (!state.gameState) return;
    
    await handleAsync(async () => {
      await PersistenceService.saveGameToFile(state.gameState!);
    });
  }, [state.gameState, handleAsync]);

  const clearGame = useCallback(() => {
    dispatch({ type: 'CLEAR_GAME' });
  }, []);

  // Card action functions
  const playCard = useCallback(async (cardId: CardId) => {
    if (!state.gameState) return;
    
    await handleAsync(async () => {
      const updatedState = await CardService.playCard(cardId, state.gameState!);
      dispatch({ type: 'SET_GAME_STATE', payload: updatedState });
    });
  }, [state.gameState, handleAsync]);

  const buyCard = useCallback(async (cardId: CardId) => {
    if (!state.gameState) return;
    
    await handleAsync(async () => {
      const updatedState = await CardService.buyCard(cardId, state.gameState!);
      dispatch({ type: 'SET_GAME_STATE', payload: updatedState });
    });
  }, [state.gameState, handleAsync]);

  const discardCard = useCallback(async (cardId: CardId) => {
    if (!state.gameState) return;
    
    await handleAsync(async () => {
      const updatedState = await CardService.discardCard(cardId, state.gameState!);
      dispatch({ type: 'SET_GAME_STATE', payload: updatedState });
    });
  }, [state.gameState, handleAsync]);

  const drawCards = useCallback(async (count: number) => {
    if (!state.gameState) return;
    
    await handleAsync(async () => {
      const updatedState = await CardService.drawCards(count, state.gameState!);
      dispatch({ type: 'SET_GAME_STATE', payload: updatedState });
    });
  }, [state.gameState, handleAsync]);

  const refreshShop = useCallback(async () => {
    if (!state.gameState) return;
    
    await handleAsync(async () => {
      const updatedState = await CardService.refreshShop(state.gameState!);
      dispatch({ type: 'SET_GAME_STATE', payload: updatedState });
    });
  }, [state.gameState, handleAsync]);

  // Round management
  const endRound = useCallback(async (): Promise<boolean> => {
    if (!state.gameState) return false;
    
    let passed = false;
    await handleAsync(async () => {
      const result = await GameService.endRound(state.gameState!);
      dispatch({ type: 'SET_GAME_STATE', payload: result.state });
      passed = result.passed;
      
      if (!passed) {
        dispatch({ type: 'SET_PLAYING', payload: false });
      }
    });
    
    return passed;
  }, [state.gameState, handleAsync]);

  // Utility functions
  const clearError = useCallback(() => {
    dispatch({ type: 'SET_ERROR', payload: null });
  }, []);

  const contextValue: GameContextType = {
    ...state,
    startNewGame,
    loadGame,
    saveGame,
    clearGame,
    playCard,
    buyCard,
    discardCard,
    drawCards,
    refreshShop,
    endRound,
    clearError,
  };

  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  );
}

// Hook to use the game context
export function useGame(): GameContextType {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}