'use server';

/**
 * @fileOverview An AI agent that enhances memory messages.
 *
 * - enhanceMemoryMessages - A function that enhances a list of memory messages.
 * - EnhanceMemoryMessagesInput - The input type for the enhanceMemoryMessages function.
 * - EnhanceMemoryMessagesOutput - The return type for the enhanceMemoryMessages function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnhanceMemoryMessagesInputSchema = z.array(
  z.object({
    image: z.string().describe('An identifier representing an image for the memory.'),
    text: z.string().describe('The heartfelt message associated with the memory.'),
  })
);

export type EnhanceMemoryMessagesInput = z.infer<
  typeof EnhanceMemoryMessagesInputSchema
>;

const EnhanceMemoryMessagesOutputSchema = z.array(
  z.object({
    image: z.string().describe('An identifier representing an image for the memory.'),
    text: z.string().describe('The creatively rewritten message for the memory.'),
  })
);

export type EnhanceMemoryMessagesOutput = z.infer<
  typeof EnhanceMemoryMessagesOutputSchema
>;

export async function enhanceMemoryMessages(
  input: EnhanceMemoryMessagesInput
): Promise<EnhanceMemoryMessagesOutput> {
  return enhanceMemoryMessagesFlow(input);
}

const enhanceMemoryMessage = ai.defineTool({
  name: 'enhanceMemoryMessage',
  description: 'Creatively rewrite a heartfelt message to express feelings in different ways.',
  inputSchema: z.object({
    image: z.string().describe('An identifier representing an image for the memory.'),
    text: z.string().describe('The original heartfelt message.'),
  }),
  outputSchema: z.object({
    image: z.string().describe('An identifier representing an image for the memory.'),
    text: z.string().describe('The creatively rewritten message.'),
  }),
  run: async (input) => {
    const {output} = await rewriteMemoryMessagePrompt(input);
    return output!;
  },
});

const rewriteMemoryMessagePrompt = ai.definePrompt({
  name: 'rewriteMemoryMessagePrompt',
  input: {schema: enhanceMemoryMessage.inputSchema},
  output: {schema: enhanceMemoryMessage.outputSchema},
  prompt: `Rewrite the following heartfelt message associated with a memory to express the feelings in different ways, keeping the same tone and emotion:

Image: {{{image}}}
Original Message: {{{text}}}

Rewritten Message:`,
});

const enhanceMemoryMessagesFlow = ai.defineFlow(
  {
    name: 'enhanceMemoryMessagesFlow',
    inputSchema: EnhanceMemoryMessagesInputSchema,
    outputSchema: EnhanceMemoryMessagesOutputSchema,
  },
  async input => {
    const enhancedMessages = await Promise.all(
      input.map(async memory => {
        return await enhanceMemoryMessage(memory);
      })
    );
    return enhancedMessages;
  }
);
