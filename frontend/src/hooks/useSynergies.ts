import { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { CardService } from '../services';
import type { SynergyResult } from '../services';

/**
 * Hook for managing synergy calculations
 */
export function useSynergies() {
  const { gameState } = useGame();
  const [synergies, setSynergies] = useState<SynergyResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateSynergies = async () => {
    if (!gameState) return;

    setIsCalculating(true);
    try {
      const result = await CardService.calculateSynergies(gameState);
      setSynergies(result);
    } catch (error) {
      console.error('Failed to calculate synergies:', error);
    } finally {
      setIsCalculating(false);
    }
  };

  // Automatically recalculate when hand changes
  useEffect(() => {
    if (gameState?.hand) {
      calculateSynergies();
    }
  }, [gameState?.hand]);

  return {
    synergies,
    isCalculating,
    calculateSynergies,
  };
}