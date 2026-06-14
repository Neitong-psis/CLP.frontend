export interface AuthRole {
  id: string | number;
  name: string;
}

export interface AuthUser {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  roles: AuthRole[];
  status: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  tokenExpires: number;
  user: AuthUser;
}

export const TOKEN_KEY = 'clp_token';
export const USER_KEY = 'clp_user';
