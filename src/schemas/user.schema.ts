import { z } from 'zod';
import { roleSchema } from './role.schema';

/**
 * Backend `User` domain shape (src/users/domain/user.ts), serialised with the
 * `me` group. Note `id` is a NUMBER (not a UUID); only `Role.id` is a UUID.
 *
 * Unknown fields (photo, timestamps, …) are intentionally dropped — we only
 * validate what the auth/RBAC layer depends on, so the contract fails loudly
 * if a relied-upon field changes shape.
 */
export const userSchema = z.object({
  id: z.number(),
  email: z.string().email().nullable().optional(),
  firstName: z.string().nullable().optional(),
  lastName: z.string().nullable().optional(),
  roles: z.array(roleSchema).default([]),
  status: z
    .object({
      id: z.union([z.number(), z.string()]),
      name: z.string().nullish(),
    })
    .nullable()
    .optional(),
});

export type User = z.infer<typeof userSchema>;
