'use client';

import { ThemeProvider } from '@/providers/ThemeProvider';

type Props = {
  children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </>
  );
};
export default Providers;
