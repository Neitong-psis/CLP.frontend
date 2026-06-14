import { z } from 'zod';
import { userSchema } from './user.schema';

/**
 * Backend `User` serialised with the `admin` group (GET/POST/PATCH
 * /api/v1/users). Same core shape as {@link userSchema}, plus `createdAt`,
 * which the admin table renders as the "Joined" column.
 */
export const adminUserSchema = userSchema.extend({
  createdAt: z.coerce.date().optional(),
});

/**
 * `InfinityPaginationResponseDto<User>` — the backend list endpoint returns
 * `{ data, hasNextPage }` with no total count.
 */
export const usersPageSchema = z.object({
  data: z.array(adminUserSchema),
  hasNextPage: z.boolean(),
});

export type AdminUser = z.infer<typeof adminUserSchema>;
export type UsersPage = z.infer<typeof usersPageSchema>;
