const RELATIVE_TIME_MINUTES: Record<string, number> = {
  m: 1,
  h: 60,
  d: 1440,
  w: 10080,
  mo: 43200,
};

/** Turns "30m ago" / "2h ago" / "1d ago" / "2w ago" / "1mo ago" into a
 *  minutes-ago value for sorting. Unparseable strings (e.g. "Just invited")
 *  sort as the most recent. */
export function parseRelativeTime(value: string): number {
  const match = /(\d+)\s*(mo|[mhdw])/.exec(value);
  if (!match) return 0;
  const [, amount, unit] = match;
  return Number(amount) * (RELATIVE_TIME_MINUTES[unit] ?? 1);
}

/** Strips currency symbols/commas and parses the number, e.g. "$1,049" → 1049. */
export function parseCurrency(value: string): number {
  const n = Number.parseFloat(value.replace(/[^0-9.-]/g, ''));
  return Number.isNaN(n) ? 0 : n;
}

/** Loose date parse for display strings like "Mar 8, 2025" — placeholder
 *  values (e.g. "—", empty) sort to the very end regardless of direction. */
export function parseDateLoose(value: string): number {
  const ms = Date.parse(value);
  return Number.isNaN(ms) ? -Infinity : ms;
}
