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
