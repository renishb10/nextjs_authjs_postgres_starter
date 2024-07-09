import Hero from '@/components/home/Hero';
import { currentUser } from '@/lib/auth';
import Image from 'next/image';

export default async function Home() {
  const user = await currentUser();
  return (
    <div>
      <div className="my-4 w-full text-end">
        <h3 className="text-2xl font-semibold">
          Welcome {user?.name || 'there'}!
        </h3>
      </div>
      <Hero />
    </div>
  );
}
