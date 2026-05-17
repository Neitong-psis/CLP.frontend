export const siteConfig = {
  name: "CLP",
  fullName: "Content Learning Platform",
  description: "Content Learning Platform — frontend UI preview (mock data, no backend).",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
} as const;

export type SiteConfig = typeof siteConfig;
