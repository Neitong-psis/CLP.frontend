const SESSION_KEY = 'admin_session';
const SESSION_DURATION_MS = 60 * 60 * 1000; // 60 minutes

export interface AdminSession {
  email: string;
  name: string;
  role: 'admin';
}

interface StoredSession extends AdminSession {
  expiresAt: number;
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

export function getAdminSession(): AdminSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const stored = JSON.parse(raw) as StoredSession;
    if (Date.now() > stored.expiresAt) {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
    const { email, name, role } = stored;
    return { email, name, role };
  } catch {
    return null;
  }
}

export function setAdminSession({ session }: { session: AdminSession }): void {
  const stored: StoredSession = {
    ...session,
    expiresAt: Date.now() + SESSION_DURATION_MS,
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(stored));
}

export default function clearAdminSession(): void {
  localStorage.removeItem(SESSION_KEY);
}
