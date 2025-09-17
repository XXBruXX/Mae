'use server';

import { enhanceMemoryMessages } from '@/ai/flows/enhance-memory-messages';
import { z } from 'zod';

const EnhanceMemorySchema = z.object({
  image: z.string(),
  text: z.string(),
});

export async function enhanceMemory(input: z.infer<typeof EnhanceMemorySchema>): Promise<string> {
  try {
    const result = await enhanceMemoryMessages([input]);
    if (result && result.length > 0 && result[0].text) {
      return result[0].text;
    }
    throw new Error('AI failed to enhance the message.');
  } catch (error) {
    console.error('Error enhancing memory:', error);
    return "Não foi possível aprimorar a mensagem. Tente novamente.";
  }
}
