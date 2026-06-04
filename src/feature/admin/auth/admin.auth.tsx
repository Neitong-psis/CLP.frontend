const SESSION_KEY = 'admin_session';

export interface AdminSession {
  email: string;
  name: string;
  role: 'admin';
}

const ADMIN_CREDENTIALS: Record<string, { password: string; name: string }> = {
  [process.env.NEXT_PUBLIC_ADMIN_EMAIL!]: {
    password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD!,
    name: process.env.NEXT_PUBLIC_ADMIN_NAME!,
  },
};

export function validateAdminCredentials(
  email: string,
  password: string,
): AdminSession | null {
  const credential = ADMIN_CREDENTIALS[email.toLowerCase()];
  if (!credential || credential.password !== password) return null;
  return { email: email.toLowerCase(), name: credential.name, role: 'admin' };
}

export function getAdminSessionRaw(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(SESSION_KEY);
}

export function getAdminSession(): AdminSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as AdminSession) : null;
  } catch {
    return null;
  }
}

export function setAdminSession(session: AdminSession): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearAdminSession(): void {
  localStorage.removeItem(SESSION_KEY);
}
