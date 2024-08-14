import { z } from "zod";

export type MessageMetadata = z.infer<typeof messageMetadataSchema>;

export const messageMetadataSchema = z.object({
  usedHistory: z.array(
    z.object({
      role: z.string(),
      content: z.string(),
    }),
  ),
  usedContext: z.array(
    z.object({
      url: z.string(),
      data: z.string(),
    }),
  ),
  usedPrompt: z.string(),
});
