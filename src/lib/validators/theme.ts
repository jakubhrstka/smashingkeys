import { z } from "zod";

export const SaveThemeValidator = z.object({
  name: z.string().min(1),
});

export type SaveThemePayload = z.infer<typeof SaveThemeValidator>;
