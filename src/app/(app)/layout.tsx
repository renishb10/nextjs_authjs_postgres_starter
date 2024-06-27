import { Suspense } from 'react';
import Providers from '@/providers/Providers';
import Navbar from '@/components/navbar/Navbar';
import Container from '@/components/common/Container';

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <Suspense>
        <Navbar />
      </Suspense>
      <Container>{children}</Container>
    </Providers>
  );
}
