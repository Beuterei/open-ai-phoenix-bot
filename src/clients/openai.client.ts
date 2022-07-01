import Client, { CompletionOpts } from 'openai-api';

const completionBaseOptions: CompletionOpts = {
    engine: 'text-davinci-002',
    maxTokens: 1000,
    temperature: 0.9,
    topP: 1,
    presencePenalty: 0,
    frequencyPenalty: 0.2,
    bestOf: 1,
    n: 1,
    stream: false,
};

export class OpenAI extends Client {
    constructor() {
        super(process.env.OPENAI_API_KEY || '');
    }

    async completePrompt(prompt: string) {
        const result = await super.complete({
            ...completionBaseOptions,
            prompt,
        });

        return result.data;
    }
}
