import { streamText } from 'ai';
import { createOllama } from 'ollama-ai-provider'

const ollama = createOllama()

export default defineLazyEventHandler(async () => {
  return defineEventHandler(async (event: any) => {
    const { messages } = await readBody(event);

    const result = await streamText({
      model: ollama('gemma2'),
      messages,
    });

    return result.toDataStreamResponse();
  });
});