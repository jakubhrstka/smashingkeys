import { z } from "zod";

export const SaveResultValidator = z.object({
  wpm: z.number().min(0),
  acc: z.number().min(0).max(100),
  time: z.number().min(1),
});

export type SaveResultPayload = z.infer<typeof SaveResultValidator>;
