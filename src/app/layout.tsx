import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";

export const metadata: Metadata = {
  title: "EduHub",
  description: "EduHub MOOC learning platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
