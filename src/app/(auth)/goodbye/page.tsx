import Logo from '@/components/navbar/Logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const GoodByePage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-4">
        <Logo />
        <h2 className="mt-6 text-4xl">We Miss You!</h2>
        <p>
          We&apos;re sad to see you go. If you ever change your mind, our doors
          are always open.
        </p>
        <Button className="mt-2" size="lg" asChild>
          <Link href="/signup">Sign Up</Link>
        </Button>
      </div>
    </div>
  );
};
export default GoodByePage;
