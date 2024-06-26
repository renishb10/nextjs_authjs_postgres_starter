import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from '@/providers/Providers';
import Navbar from '@/components/navbar/Navbar';
import Container from '@/components/common/Container';

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
        <Providers>
          <Suspense>
            <Navbar />
          </Suspense>
          <Container>{children}</Container>
        </Providers>
      </body>
    </html>
  );
}
