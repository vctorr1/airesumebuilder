import React from 'react';
import { Wand2 } from 'lucide-react';
import { useAIService } from '../hooks/useAIService';
import { AIService } from '../services/ai';

interface Props {
  onEnhance: (text: string) => void;
  text: string;
  aiService: AIService;
}

export function AIEnhanceButton({ onEnhance, text, aiService }: Props) {
  const { enhancing, error, enhance, clearError } = useAIService(aiService);

  const handleEnhance = async () => {
    try {
      const enhanced = await enhance(text);
      onEnhance(enhanced);
    } catch (err) {
      // Error is handled by the hook
    }
  };

  return (
    <div className="w-full">
      <button
        onClick={handleEnhance}
        disabled={enhancing || !text.trim()}
        className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md text-white transition-colors ${
          enhancing || !text.trim()
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        <Wand2 className="w-4 h-4" />
        {enhancing ? 'Enhancing...' : 'Enhance with AI'}
      </button>
      
      {error && (
        <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-md">
          <div className="flex justify-between items-start">
            <p className="text-red-600 text-sm">{error}</p>
            <button
              onClick={clearError}
              className="text-red-400 hover:text-red-600 text-sm"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  );
}