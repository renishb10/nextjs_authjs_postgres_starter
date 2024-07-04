'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { signOut } from 'next-auth/react';
import UserAvatar from './UserAvatar';
import { useRouter } from 'next/navigation';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import Link from 'next/link';
import { LogOutIcon, UserRoundCogIcon } from 'lucide-react';

const UserMenu = () => {
  const router = useRouter();
  const user = useCurrentUser();

  const handleSignOut = async (): Promise<void> => {
    await signOut();
    router.push('/');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar imageSrc={user?.image || ''} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="start" sideOffset={10}>
        <DropdownMenuItem asChild>
          <Link href="/settings">
            <UserRoundCogIcon className="h-4 w-4 mr-2" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOutIcon className="h-4 w-4 mr-2" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default UserMenu;
