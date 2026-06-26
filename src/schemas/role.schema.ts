import { z } from 'zod';

export const roleSchema = z.object({
  id: z.string(),
  name: z.string().nullish(),
  description: z.string().nullish(),
});

export type Role = z.infer<typeof roleSchema>;
