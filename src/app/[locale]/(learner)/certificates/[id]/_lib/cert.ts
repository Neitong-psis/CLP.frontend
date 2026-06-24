import { CERTIFICATES, type Certificate } from '@/config/learner';

export function getCertById(id: string): Certificate | undefined {
  return CERTIFICATES.find((c) => c.id === id);
}
