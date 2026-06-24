const LS_KEY = 'qb_verified_certs';
const LS_NAMES_KEY = 'qb_cert_names';

export function readVerifiedCerts(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) ?? '[]') as string[];
  } catch {
    return [];
  }
}

export function readVerifiedCertName(id: string): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const map = JSON.parse(
      localStorage.getItem(LS_NAMES_KEY) ?? '{}',
    ) as Record<string, string>;
    return map[id] ?? null;
  } catch {
    return null;
  }
}

export function markCertVerified(id: string, name: string): void {
  const list = readVerifiedCerts();
  if (!list.includes(id)) {
    localStorage.setItem(LS_KEY, JSON.stringify([...list, id]));
  }
  try {
    const map = JSON.parse(
      localStorage.getItem(LS_NAMES_KEY) ?? '{}',
    ) as Record<string, string>;
    map[id] = name;
    localStorage.setItem(LS_NAMES_KEY, JSON.stringify(map));
  } catch {}
}
