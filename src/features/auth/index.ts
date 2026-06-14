export {
  login,
  oauthLogin,
  register,
  getMe,
  refresh,
  logout,
} from './auth.api';
export {
  isGoogleLoginEnabled,
  startGoogleLogin,
  consumeGoogleCallback,
} from './google-oauth';
export type {
  LoginRequest,
  OAuthLoginRequest,
  OAuthProvider,
  RegisterRequest,
  LoginResult,
} from '@/schemas/auth.schema';
export type { User } from '@/schemas/user.schema';
export type { Role } from '@/schemas/role.schema';

/*
 * Extension point: future domains (courses, enrollments, …) should follow this
 * same shape — a `<domain>.api.ts` of typed, zod-validated functions using the
 * shared `http` instance, re-exported from a barrel like this one. Do NOT call
 * axios directly inside components.
 */
