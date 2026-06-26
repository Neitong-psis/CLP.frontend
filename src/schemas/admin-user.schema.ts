import { z } from 'zod';
import { userSchema } from './user.schema';

export const adminUserSchema = userSchema.extend({
  createdAt: z.coerce.date().optional(),
});

export const usersPageSchema = z.object({
  data: z.array(adminUserSchema),
  hasNextPage: z.boolean(),
});

export type AdminUser = z.infer<typeof adminUserSchema>;
export type UsersPage = z.infer<typeof usersPageSchema>;
