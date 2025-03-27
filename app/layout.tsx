import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from './auth-provider';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'EqualCure | HCV Treatment Program Solutions',
  description: 'Partner with EqualCure to expand access to Hepatitis C treatment while optimizing your 340B program benefits.',
  openGraph: {
    title: 'EqualCure | HCV Treatment Program Solutions',
    description: 'Partner with EqualCure to expand access to Hepatitis C treatment while optimizing your 340B program benefits.',
    url: 'https://equalcure-v3.vercel.app',
    siteName: 'EqualCure',
    images: [
      {
        url: '/og-image.jpg', // You'll need to add this image to your public folder
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EqualCure | HCV Treatment Program Solutions',
    description: 'Partner with EqualCure to expand access to Hepatitis C treatment while optimizing your 340B program benefits.',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <AuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem={false}
              disableTransitionOnChange
            >
              {children}
              <Toaster />
            </ThemeProvider>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}