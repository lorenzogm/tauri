import { useState, useEffect, useCallback } from 'react';
import { PersistenceService } from '../services';
import type { SaveFileInfo } from '../services';

/**
 * Hook for managing save files
 */
export function useSaveFiles() {
  const [saveFiles, setSaveFiles] = useState<SaveFileInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadSaveFiles = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const files = await PersistenceService.listSaveFiles();
      setSaveFiles(files);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load save files');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteSaveFile = useCallback(async (saveId: string) => {
    try {
      await PersistenceService.deleteSaveFile(saveId);
      // Refresh the list after deletion
      await loadSaveFiles();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete save file');
    }
  }, [loadSaveFiles]);

  // Load save files on mount
  useEffect(() => {
    loadSaveFiles();
  }, [loadSaveFiles]);

  return {
    saveFiles,
    isLoading,
    error,
    loadSaveFiles,
    deleteSaveFile,
    clearError: () => setError(null),
  };
}