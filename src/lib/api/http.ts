import { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { createApi } from '@/config/axios';
import { VERSIONED_API_URL } from './config';
import { normalizeError } from './errors';
import { getAccessToken } from '@/lib/session/access-token-store';
import { clearSession } from '@/lib/session/session';
import { refreshSession } from '@/lib/session/refresh';
import { getLocale } from '@/lib/i18n/locale-store';

type RetriableConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

const UNAUTHORIZED = 401;
const LOGIN_PATH = '/auth';

export const http = createApi({
  baseURL: VERSIONED_API_URL,
  getToken: getAccessToken,
});

function redirectToLogin(): void {
  if (typeof window === 'undefined') return;

  window.location.assign(LOGIN_PATH);
}

function isUnauthorizedError(error: AxiosError): boolean {
  return error.response?.status === UNAUTHORIZED;
}

function canRetry(config?: RetriableConfig): config is RetriableConfig {
  return Boolean(config && !config._retry);
}

function handleSessionExpired(): never {
  clearSession();
  redirectToLogin();
  throw new Error('Session expired');
}

async function retryRequest(config: RetriableConfig) {
  const session = await refreshSession();

  if (!session) {
    return handleSessionExpired();
  }

  config._retry = true;
  config.headers.set('Authorization', `Bearer ${session.accessToken}`);

  return http.request(config);
}

async function handleUnauthorized(error: AxiosError) {
  const config = error.config as RetriableConfig | undefined;

  if (!isUnauthorizedError(error) || !canRetry(config)) {
    return Promise.reject(normalizeError(error));
  }

  try {
    return await retryRequest(config);
  } catch {
    return Promise.reject(normalizeError(error));
  }
}

// Forward the active locale to the backend so nestjs-i18n uses the correct language
http.interceptors.request.use((config) => {
  config.headers.set('x-custom-lang', getLocale());
  return config;
});

http.interceptors.response.use((response) => response, handleUnauthorized);
