'use client';

import Container from '@/components/common/Container';
import Logo from '@/components/navbar/Logo';
import { Button } from '@/components/ui/button';
import DarkMode from '@/components/navbar/DarkMode';
import { useState } from 'react';
import Link from 'next/link';
import { publicLinks } from '@/lib/links';

const Navbar = () => {
  const [clicked, setClicked] = useState(false);

  const toggleNavbar = (): void => {
    setClicked(!clicked);
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
                Signup
              </Link>
            </Button>
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
            {clicked ? (
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
      </Container>
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
          </div>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
