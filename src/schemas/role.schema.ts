import { z } from 'zod';

/**
 * Backend `Role` domain shape (src/roles/domain/role.ts).
 * `id` is a UUID string; `name`/`description` are optional.
 */
export const roleSchema = z.object({
  id: z.string(),
  name: z.string().nullish(),
  description: z.string().nullish(),
});

export type Role = z.infer<typeof roleSchema>;
