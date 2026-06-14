import { z } from 'zod';
import { userSchema } from './user.schema';

/* ------------------------------------------------------------------ *
 * Requests — mirror the backend DTOs (class-validator).
 * ------------------------------------------------------------------ */

/** `AuthEmailLoginDto` */
export const loginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

/** `AuthRegisterLoginDto` — backend requires password ≥ 6. */
export const registerRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

/** Providers the backend `POST auth/oauth/:provider` endpoint accepts. */
export const oauthProviderSchema = z.enum(['google', 'facebook', 'apple']);

/** `AuthOAuthLoginDto` + provider — google/apple send `idToken`, facebook sends `accessToken`. */
export const oauthLoginRequestSchema = z
  .object({
    provider: oauthProviderSchema,
    idToken: z.string().min(1).optional(),
    accessToken: z.string().min(1).optional(),
  })
  .refine(
    (v) => (v.provider === 'facebook' ? !!v.accessToken : !!v.idToken),
    'Missing OAuth credential for the selected provider.',
  );

/* ------------------------------------------------------------------ *
 * Backend responses — parsed server-side in the BFF / api layer.
 * ------------------------------------------------------------------ */

/** `LoginResponseDto` — `tokenExpires` is epoch ms (number). */
export const loginResponseSchema = z.object({
  token: z.string(),
  refreshToken: z.string(),
  tokenExpires: z.number(),
  user: userSchema,
});

/** `RefreshResponseDto`. */
export const refreshResponseSchema = z.object({
  token: z.string(),
  refreshToken: z.string(),
  tokenExpires: z.number(),
});

/* ------------------------------------------------------------------ *
 * BFF → client responses — the refresh token is stripped here; only the
 * access token + expiry (and user, for login) ever reach the browser.
 * ------------------------------------------------------------------ */

export const loginResultSchema = z.object({
  accessToken: z.string(),
  tokenExpires: z.number(),
  user: userSchema,
});

export const refreshResultSchema = z.object({
  accessToken: z.string(),
  tokenExpires: z.number(),
});

export type LoginRequest = z.infer<typeof loginRequestSchema>;
export type RegisterRequest = z.infer<typeof registerRequestSchema>;
export type OAuthProvider = z.infer<typeof oauthProviderSchema>;
export type OAuthLoginRequest = z.infer<typeof oauthLoginRequestSchema>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;
export type RefreshResponse = z.infer<typeof refreshResponseSchema>;
export type LoginResult = z.infer<typeof loginResultSchema>;
export type RefreshResult = z.infer<typeof refreshResultSchema>;
