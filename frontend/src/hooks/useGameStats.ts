import { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { GameService } from '../services';
import type { GameStats } from '../services';

/**
 * Hook for getting comprehensive game statistics
 */
export function useGameStats() {
  const { gameState } = useGame();
  const [stats, setStats] = useState<GameStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshStats = async () => {
    if (!gameState) return;

    setIsLoading(true);
    setError(null);
    try {
      const gameStats = await GameService.getGameStats(gameState);
      setStats(gameStats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get game stats');
    } finally {
      setIsLoading(false);
    }
  };

  // Automatically refresh stats when game state changes
  useEffect(() => {
    if (gameState) {
      refreshStats();
    } else {
      setStats(null);
    }
  }, [gameState]);

  return {
    stats,
    isLoading,
    error,
    refreshStats,
    clearError: () => setError(null),
  };
}