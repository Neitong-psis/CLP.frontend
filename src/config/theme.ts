export const clpColors = {
  primaryNavy: "#0F172A",
  secondaryNavy: "#1E3A5F",
  accentGold: "#E6A23C",
  background: "#F8FAFC",
  card: "#FFFFFF",
  textPrimary: "#0F172A",
  textSecondary: "#64748B",
} as const;

export type ClpColorToken = keyof typeof clpColors;
