import { useContext } from 'react';
import { GameContext } from '../context/context';
import type { GameContextType } from '../context/context';

// Hook to use the game context
export function useGame(): GameContextType {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}