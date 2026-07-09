import { z } from 'zod';
import { roleSchema } from './role.schema';

export const userSchema = z.object({
  id: z.string(),
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
