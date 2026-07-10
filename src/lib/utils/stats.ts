export interface ParsedStat {
  prefix: string;
  number: number;
  suffix: string;
}

export function parseStat(raw: string): ParsedStat {
  const match = raw.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/); //// Matches: prefix + number + suffix
  if (!match) return { prefix: '', number: 0, suffix: raw };
  return {
    prefix: match[1],
    number: parseFloat(match[2]),
    suffix: match[3],
  };
}

export function formatCount(target: number, animated: number): string {
  return Number.isInteger(target)
    ? String(Math.round(animated))
    : animated.toFixed(1);
}

/** Compacts a dollar amount to e.g. "$1.2M" / "$48.6k" / "$320". */
export function formatCurrencyCompact(amount: number): string {
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000) return `$${(amount / 1_000).toFixed(1)}k`;
  return `$${amount.toFixed(0)}`;
}

/** Formats a signed percentage trend, e.g. "+15%" / "-3%" / "0%". */
export function formatTrend(pct: number): string {
  return `${pct > 0 ? '+' : ''}${pct}%`;
}
