'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import logoLight from '../../../public/img/logo_light.png';
import logoDark from '../../../public/img/logo_dark.png';

const Logo = () => {
  const { theme } = useTheme();
  return (
    <Link href="/" className="w-40 h-full">
      {/* Your Logo goes here */}
      <Image src={theme === 'dark' ? logoDark : logoLight} alt="logo" />
    </Link>
  );
};
export default Logo;
