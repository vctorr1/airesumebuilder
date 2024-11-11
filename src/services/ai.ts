export interface AIService {
  enhanceResume: (text: string) => Promise<string>;
}

export class AIError extends Error {
  constructor(message: string, public readonly cause?: unknown) {
    super(message);
    this.name = 'AIError';
  }
}

export class MockAIService implements AIService {
  async enhanceResume(text: string): Promise<string> {
    console.log('Mock AI Service called with:', text);
    return text;
  }
}

export class LMStudioService implements AIService {
  private baseUrl: string;
  
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async enhanceResume(text: string): Promise<string> {
    if (!text.trim()) {
      throw new AIError('Please provide some text to enhance');
    }

    try {
      const response = await fetch(`${this.baseUrl}/v1/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: this.createPrompt(text),
          model: "llama-3.2-3b-instruct",
          temperature: 0.7,
          max_tokens: 2000,
          stop: ["</s>", "<|user|>", "<|system|>", "<|assistant|>"],
          stream: false
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new AIError(
          `LM Studio API error (${response.status}): ${errorText}`,
          { status: response.status, body: errorText }
        );
      }

      const data = await response.json();
      
      if (!data.choices?.[0]?.text) {
        throw new AIError(
          'Invalid response format from LM Studio',
          data
        );
      }

      return data.choices[0].text.trim();
    } catch (error) {
      if (error instanceof AIError) {
        throw error;
      }
      
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new AIError(
          'Unable to connect to LM Studio. Please ensure the server is running at ' + this.baseUrl,
          error
        );
      }

      throw new AIError(
        'An unexpected error occurred while communicating with LM Studio',
        error
      );
    }
  }

  private createPrompt(text: string): string {
    return `<|system|>You are a professional resume writer who enhances text to be more impactful while maintaining accuracy.</s>
<|user|>Please enhance the following text to be more impactful and professional. Use strong action verbs and quantifiable achievements while maintaining accuracy and truthfulness:

${text}</s>
<|assistant|>`;
  }
}