'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AlignRight, X } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Container from '@/components/common/Container';
import Logo from '@/components/navbar/Logo';
import { Button } from '@/components/ui/button';
import DarkMode from '@/components/navbar/DarkMode';
import { publicLinks } from '@/lib/links';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [clicked, setClicked] = useState(false);
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();

  const toggleNavbar = (): void => {
    setClicked(!clicked);
  };

  const handleSignOut = async (): Promise<void> => {
    await signOut();
    router.push('/');
  };

  return (
    <nav className="border-b">
      <Container className="flex justify-between items-center gap-4 py-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 w-40">
              <Logo />
            </div>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:block">
          <div className="ml-4 flex items-center space-x-4">
            {publicLinks.map((link) => (
              <Link
                href={link.href}
                key={link.label}
                className="capitalize text-black hover:bg-white hover:text-black rounded-lg p-2"
              >
                {link.label}
              </Link>
            ))}
            <DarkMode />
            {sessionStatus === 'loading' ? null : !session ? (
              <>
                <Button asChild variant="outline">
                  <Link
                    href="/login"
                    className="capitalize text-black hover:bg-white hover:text-black rounded-lg p-2"
                  >
                    Login
                  </Link>
                </Button>
                <Button asChild>
                  <Link
                    href="/signup"
                    className="capitalize text-black hover:bg-white hover:text-black rounded-lg p-2"
                  >
                    Sign Up
                  </Link>
                </Button>
              </>
            ) : (
              <Button variant="outline" onClick={handleSignOut}>
                Sign Out
              </Button>
            )}
          </div>
        </div>
        <div className="md:hidden flex items-center gap-4">
          <div className="md:hidden">
            <DarkMode />
          </div>
          <button
            className="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            onClick={toggleNavbar}
          >
            {clicked ? <X /> : <AlignRight />}
          </button>
        </div>
      </Container>

      {/* Mobile Menu */}
      {clicked && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {publicLinks.map((link) => (
              <Link
                href={link.href}
                key={link.label}
                className="capitalize block text-black hover:bg-white hover:text-black rounded-lg p-2"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex justify-center items-center gap-4 mb-6">
            {sessionStatus === 'loading' ? null : !session ? (
              <>
                <Button asChild variant="outline" size="lg">
                  <Link
                    href="/login"
                    className="capitalize text-black hover:bg-white hover:text-black rounded-lg p-2"
                  >
                    Login
                  </Link>
                </Button>
                <Button asChild size="lg">
                  <Link
                    href="/signup"
                    className="capitalize text-black hover:bg-white hover:text-black rounded-lg p-2"
                  >
                    Signup
                  </Link>
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                size="lg"
                onClick={handleSignOut}
                className="w-4/5"
              >
                Sign Out
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
