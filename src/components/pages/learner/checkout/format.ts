/**
 * Pure input-formatting for the card form. Each function takes whatever the
 * user just typed (which may already contain the formatting from a previous
 * keystroke) and returns the canonical display string — so they're safe to
 * call on every keystroke without double-inserting separators.
 */

/** "4242424242424242" → "4242 4242 4242 4242". Caps at 19 digits (longest PANs). */
export function formatCardNumber(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 19);
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
}

/** "1225" → "12/25". Caps the month digit-pair at 12 as it's typed. */
export function formatExpiry(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 4);
  if (digits.length === 0) return '';
  const month = digits.slice(0, 2);
  const clampedMonth = month.length === 2 && Number(month) > 12 ? '12' : month;
  const year = digits.slice(2);
  return year ? `${clampedMonth}/${year}` : clampedMonth;
}

/** Digits only, capped at 4 (covers Amex's 4-digit CVV). */
export function formatCvv(raw: string): string {
  return raw.replace(/\D/g, '').slice(0, 4);
}
