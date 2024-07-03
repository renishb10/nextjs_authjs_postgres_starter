import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import authImage from '../../../../../public/img/auth_img.jpg';
import Logo from '@/components/navbar/Logo';
import ResetForm from '@/components/auth/ResetForm';

export const metadata: Metadata = {
  title: 'Reset Your Password | NextJS Starter Code',
  description: 'Forgot your password, no worries. We have got you covered.',
};

const ResetPage = () => {
  return (
    <>
      <div className="flex w-full flex-wrap">
        <div className="flex w-full flex-col md:w-1/2 lg:w-1/3">
          <div className="flex justify-center pt-12 md:-mb-24 md:justify-start md:pl-12">
            <Logo />
          </div>
          <div className="my-auto flex flex-col justify-center px-6 pt-8 sm:px-24 md:justify-start md:px-8 md:pt-0 lg:px-12">
            <p className="text-center text-3xl font-bold">
              Forgot Your Password?
            </p>
            <p className="my-2 text-center">
              No worries! We&apos;ve got you covered.
            </p>

            <ResetForm />

            <div className="pt-2 pb-12 text-center">
              <p className="whitespace-nowrap">
                Back to
                <Link href="signup" className="font-semibold underline">
                  {' '}
                  Login.{' '}
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="pointer-events-none hidden select-none bg-black shadow-2xl md:block md:w-1/2 lg:w-2/3">
          <Image
            className="h-screen w-full object-cover opacity-90"
            src={authImage}
            alt="Login"
          />
        </div>
      </div>
    </>
  );
};

export default ResetPage;
