import { useState } from 'react';
import { AIError, AIService } from '../services/ai';

interface UseAIServiceResult {
  enhancing: boolean;
  error: string | null;
  enhance: (text: string) => Promise<string>;
  clearError: () => void;
}

export function useAIService(service: AIService): UseAIServiceResult {
  const [enhancing, setEnhancing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const enhance = async (text: string): Promise<string> => {
    try {
      setEnhancing(true);
      setError(null);
      return await service.enhanceResume(text);
    } catch (err) {
      const errorMessage = err instanceof AIError
        ? err.message
        : 'An unexpected error occurred while enhancing the text';
      setError(errorMessage);
      throw err;
    } finally {
      setEnhancing(false);
    }
  };

  const clearError = () => setError(null);

  return { enhancing, error, enhance, clearError };
}