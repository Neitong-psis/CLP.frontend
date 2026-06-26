const LS_KEY = 'qb_verified_certs';
const LS_NAMES_KEY = 'qb_cert_names';
const LS_DRAFTS_KEY = 'qb_cert_drafts';

/** Shape of a saved certificate-verification draft. */
export interface CertDraft {
  fullName: string;
  email: string;
  phone: string;
  studentId: string;
  institution: string;
  cohort: string;
}

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

// ── Verification drafts ─────────────────────────────────────────────────────

/** Read a previously saved verification draft for a certificate, if any. */
export function readCertDraft(id: string): CertDraft | null {
  if (typeof window === 'undefined') return null;
  try {
    const map = JSON.parse(
      localStorage.getItem(LS_DRAFTS_KEY) ?? '{}',
    ) as Record<string, CertDraft>;
    return map[id] ?? null;
  } catch {
    return null;
  }
}

/** Persist the in-progress verification form so it survives a reload. */
export function saveCertDraft(id: string, draft: CertDraft): void {
  if (typeof window === 'undefined') return;
  try {
    const map = JSON.parse(
      localStorage.getItem(LS_DRAFTS_KEY) ?? '{}',
    ) as Record<string, CertDraft>;
    map[id] = draft;
    localStorage.setItem(LS_DRAFTS_KEY, JSON.stringify(map));
  } catch {}
}

/** Remove a saved draft (e.g. after the verification is submitted). */
export function clearCertDraft(id: string): void {
  if (typeof window === 'undefined') return;
  try {
    const map = JSON.parse(
      localStorage.getItem(LS_DRAFTS_KEY) ?? '{}',
    ) as Record<string, CertDraft>;
    delete map[id];
    localStorage.setItem(LS_DRAFTS_KEY, JSON.stringify(map));
  } catch {}
}
