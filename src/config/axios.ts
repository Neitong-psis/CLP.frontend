import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';

export type TokenProvider = () => Promise<string | null> | string | null;
export type UnauthorizedHandler = (error: AxiosError) => void;

export interface CreateApiProps {
  baseURL: string;
  getToken?: TokenProvider;
  config?: AxiosRequestConfig;
  onUnauthorized?: UnauthorizedHandler;
}

const DEFAULT_CONFIG: AxiosRequestConfig = {
  timeout: 30_000,
  headers: { 'Content-Type': 'application/json' },
};

/**
 * Creates an Axios client configured for authenticated API requests.
 *
 * Automatically:
 * - Merges `DEFAULT_CONFIG` (30 s timeout, JSON content-type) with any extra `config`.
 * - Injects a Bearer token before each request when `getToken` is provided.
 * - Calls `onUnauthorized` on every 401 response (e.g. to trigger a redirect or clear state).
 *
 * For the full single-flight refresh + retry flow, wire up an additional response
 * interceptor after calling this function (see `src/lib/api/http.ts`).
 *
 * @param options - Base URL, optional token provider, optional 401 hook, and extra Axios config.
 * @returns A configured {@link AxiosInstance}.
 *
 * @example
 * const api = createApi({
 *   baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
 *   getToken: () => authStore.accessToken,
 *   onUnauthorized: () => router.push('/auth/login'),
 * });
 * const { data } = await api.get<User>('/auth/me');
 */
export const createApi = ({
  baseURL,
  getToken,
  config,
  onUnauthorized,
}: CreateApiProps): AxiosInstance => {
  const api = axios.create({ baseURL, ...DEFAULT_CONFIG, ...config });

  api.interceptors.request.use(async (request: InternalAxiosRequestConfig) => {
    if (!getToken) return request;

    const token = await getToken();
    if (token) {
      request.headers.set('Authorization', `Bearer ${token}`);
    }
    return request;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        onUnauthorized?.(error);
      }
      return Promise.reject(error);
    },
  );

  return api;
};
