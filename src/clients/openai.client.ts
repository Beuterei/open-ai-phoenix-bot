import Client, { CompletionOpts } from 'openai-api';

const baseOptions: CompletionOpts = {
    engine: 'davinci',
    maxTokens: 1000,
    temperature: 0.9,
    topP: 1,
    presencePenalty: 0,
    frequencyPenalty: 0,
    bestOf: 1,
    n: 1,
    stream: false,
};

export class OpenAI {
    private client: Client;

    constructor() {
        this.client = new Client(process.env.OPENAI_API_KEY || '');
    }

    async complete(prompt: string) {
        const result = await this.client.complete({
            ...baseOptions,
            prompt,
        });

        return result.data;
    }
}
