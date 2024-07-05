import Hero from '@/components/home/Hero';
import { currentUser } from '@/lib/auth';
import Image from 'next/image';

export default async function Home() {
  const user = await currentUser();
  return (
    <div>
      <h1 className="text-2xl font-semibold">
        Welcome {user?.name || 'there'}!
      </h1>
      <Hero />
    </div>
  );
}
