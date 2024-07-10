'use client';

import { redirectToRepo } from '@/actions/redirect';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const Hero = () => {
  const router = useRouter();

  const handleClick = () => {
    redirectToRepo()
      .then((data) => {
        if (data.error) {
          router.push('/login');
        }

        if (data.success) {
          window.open(data.success, '_blank');
        }
      })
      .catch(() => console.log('Something went wrong!'));
  };

  return (
    <div>
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              Kickstart Your Next.js Projects Effortlessly
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400">
              Boost your productivity with our ready-to-use Next.js boilerplate.
              Featuring the latest technologies and best practices, our
              boilerplate code gets you up and running in no time. Explore it on
              GitHub and start building your next great application today!
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button
                onClick={handleClick}
                className="rounded-md bg-black dark:bg-white px-3.5 py-2.5 text-sm font-semibold text-white dark:text-black shadow-sm hover:bg-slate-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
              >
                Get started
              </Button>
              <a
                href="/about"
                className="text-sm font-semibold leading-6 text-slate-900 dark:text-slate-300"
              >
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Hero;
