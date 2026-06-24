import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import './globals.css';
import { rootMetadata } from '@/config/metadata';
import { THEME_COOKIE } from '@/hooks/useTheme';
import { AuthProvider } from '@/providers/auth-provider';
import { ThemeProvider } from '@/providers/theme-provider';

export const metadata: Metadata = rootMetadata;

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const isDark = cookieStore.get(THEME_COOKIE)?.value === 'dark';
  const locale = cookieStore.get('NEXT_LOCALE')?.value ?? 'en';

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={isDark ? 'dark' : ''}
    >
      <body className="flex min-h-screen flex-col">
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
