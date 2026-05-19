import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default:  "AYLA",
    template: "%s | AYLA",
  },
  description:
    "Empowering the next generation of leaders through world-class Australian curriculum education in Cambodia.",
  icons: {
    icon:        "/logo/ayla-logo/AYLA%20All%20Logo-21.svg",
    shortcut:    "/logo/ayla-logo/AYLA%20All%20Logo-11.svg",
    apple:       "/logo/ayla-logo/AYLA%20All%20Logo-11.svg",
  },
  openGraph: {
    title:       "AYLA — Australia Young Leaders Academy",
    description: "Empowering the next generation of leaders through world-class Australian curriculum education in Cambodia.",
    siteName:    "AYLA",
    images:      [{ url: "/logo/ayla-logo/AYLA%20All%20Logo-11.svg" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">{children}</body>
    </html>
  );
}
