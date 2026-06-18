import { http as apiClient } from './http';
import type { User as AuthUser } from '@/schemas/user.schema';
import type { LoginResponse } from '@/schemas/auth.schema';

const PREFIX = '/v1/auth';

export enum UserRole {
  Admin = 'admin',
  Educator = 'educator',
  Learner = 'learner',
  User = 'user',
}

const ROLE_REDIRECTS: Partial<Record<UserRole, string>> = {
  [UserRole.Admin]: '/admin',
  [UserRole.Educator]: '/educator',
};

const DEFAULT_REDIRECT = '/dashboard';

export async function apiLogin(
  email: string,
  password: string,
): Promise<LoginResponse> {
  const { data } = await apiClient.post<LoginResponse>(
    `${PREFIX}/email/login`,
    { email, password },
  );
  return data;
}

export async function apiRegister(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
): Promise<AuthUser> {
  const { data } = await apiClient.post<AuthUser>(`${PREFIX}/email/register`, {
    firstName,
    lastName,
    email,
    password,
  });
  return data;
}

export async function apiConfirmEmail(hash: string): Promise<void> {
  await apiClient.post(`${PREFIX}/email/confirm`, { hash });
}

export async function apiMe(): Promise<AuthUser> {
  const { data } = await apiClient.get<AuthUser>(`${PREFIX}/me`);
  return data;
}

export async function apiLogout(): Promise<void> {
  await apiClient.post(`${PREFIX}/logout`).catch(() => {});
}

export function getRedirectPath(roleName: string): string {
  const role = roleName.toLowerCase() as UserRole;
  return ROLE_REDIRECTS[role] ?? DEFAULT_REDIRECT;
}

export function parseApiError(error: unknown): string {
  if (error && typeof error === 'object' && 'response' in error) {
    const resp = (
      error as { response?: { data?: { errors?: Record<string, string> } } }
    ).response;
    const errors = resp?.data?.errors;
    if (errors) {
      if (
        errors.email === 'notFound' ||
        errors.email === 'incorrectPassword' ||
        errors.password === 'incorrect'
      ) {
        return 'Invalid email or password.';
      }
      if (errors.email === 'accountInactive') {
        return 'Your account is inactive. Please contact support.';
      }
      if (errors.email === 'alreadyExists') {
        return 'An account with this email already exists.';
      }
    }
  }
  return 'Something went wrong. Please try again.';
}
