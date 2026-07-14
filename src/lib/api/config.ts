// ─── Base URL ─────────────────────────────────────────────────────────────────
const DEFAULT_API_BASE_URL = 'http://localhost:4000';

const publicBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

// A missing public base URL is a hard error in production — but only at *runtime*.
// Throwing at module-evaluation would also abort `next build` (which evaluates this
// module while collecting page data, with NODE_ENV==='production'), so the build
// phase is excluded. Set NEXT_PUBLIC_API_BASE_URL in your deploy env to silence this.
if (
  !publicBaseUrl &&
  process.env.NODE_ENV === 'production' &&
  process.env.NEXT_PHASE !== 'phase-production-build'
) {
  throw new Error(
    '[config] NEXT_PUBLIC_API_BASE_URL must be set in production',
  );
}

export const API_BASE_URL = (publicBaseUrl ?? DEFAULT_API_BASE_URL).replace(
  /\/+$/,
  '',
);

// ─── API config ───────────────────────────────────────────────────────────────
export const API_CONFIG = {
  baseUrl: API_BASE_URL,
  prefix: 'api',
  version: 'v1',
} as const;

export const VERSIONED_API_URL = `${API_CONFIG.baseUrl}/${API_CONFIG.prefix}/${API_CONFIG.version}`;

export function apiUrl<const P extends string>(
  path: P,
): `${string}/api/v1/${P}` {
  return `${VERSIONED_API_URL}/${path.replace(/^\/+/, '')}` as `${string}/api/v1/${P}`;
}

// ─── Backend endpoints ────────────────────────────────────────────────────────
export const AUTH_ENDPOINTS = {
  login: 'auth/email/login',
  register: 'auth/email/register',
  confirmEmail: 'auth/email/confirm',
  me: 'auth/me',
  refresh: 'auth/refresh',
  logout: 'auth/logout',
  forgotPassword: 'auth/password/forgot',
  resetPassword: 'auth/password/reset',
  oauth: 'auth/oauth',
} as const;

export type OAuthProvider = 'google' | 'facebook' | 'apple';

export const AuthApi = {
  login: () => apiUrl(AUTH_ENDPOINTS.login),
  register: () => apiUrl(AUTH_ENDPOINTS.register),
  confirmEmail: () => apiUrl(AUTH_ENDPOINTS.confirmEmail),
  me: () => apiUrl(AUTH_ENDPOINTS.me),
  refresh: () => apiUrl(AUTH_ENDPOINTS.refresh),
  logout: () => apiUrl(AUTH_ENDPOINTS.logout),
  forgotPassword: () => apiUrl(AUTH_ENDPOINTS.forgotPassword),
  resetPassword: () => apiUrl(AUTH_ENDPOINTS.resetPassword),
  oauth: (provider: OAuthProvider) =>
    apiUrl(`${AUTH_ENDPOINTS.oauth}/${provider}` as const),
} as const;

// ─── BFF endpoints (Next.js route handlers) ───────────────────────────────────
export const BFF_ENDPOINTS = {
  login: '/api/auth/login',
  adminLogin: '/api/auth/admin/login',
  educatorLogin: '/api/auth/educator/login',
  learnerLogin: '/api/auth/learner/login',
  oauth: '/api/auth/oauth',
  refresh: '/api/auth/refresh',
  logout: '/api/auth/logout',
  /** Mock-mode-only profile endpoint — see `app/api/auth/me/route.ts`. */
  me: '/api/auth/me',
} as const;
