import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import BgGradientTop from '@/components/common/BgGradientTop';
import BgGradientBottom from '@/components/common/BgGradientBottom';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NextJS - AuthJS & Postgres Starter Code',
  description: 'Launch and Deliver Your Product at Lightning Speed.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <BgGradientTop />
        <Toaster />
        <div className="z-0">{children}</div>
        <BgGradientBottom />
      </body>
    </html>
  );
}
