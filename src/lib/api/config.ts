const DEFAULT_BASE_URL = 'http://localhost:4000';

export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_BASE_URL
).replace(/\/+$/, '');

export const API_PREFIX = 'api';

export const API_VERSION = 'v1';

export const VERSIONED_API_URL = `${API_BASE_URL}/${API_PREFIX}/${API_VERSION}`;

export function apiUrl(path: string): string {
  return `${VERSIONED_API_URL}/${path.replace(/^\/+/, '')}`;
}

/** Backend auth endpoints */
export const AUTH_ENDPOINTS = {
  login: 'auth/email/login',
  register: 'auth/email/register',
  confirmEmail: 'auth/email/confirm',
  me: 'auth/me',
  refresh: 'auth/refresh',
  logout: 'auth/logout',
  /** Append `/:provider` (google | facebook | apple). */
  oauth: 'auth/oauth',
} as const;

export const BFF_ENDPOINTS = {
  login: '/api/auth/login',
  adminLogin: '/api/auth/admin/login',
  oauth: '/api/auth/oauth',
  refresh: '/api/auth/refresh',
  logout: '/api/auth/logout',
} as const;
