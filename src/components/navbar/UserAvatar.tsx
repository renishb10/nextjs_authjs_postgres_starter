import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { AvatarIcon } from '@radix-ui/react-icons';

type UserAvatarProps = {
  imageSrc: string;
  classNames?: string | undefined;
};

const UserAvatar = ({ imageSrc, classNames }: UserAvatarProps) => {
  return (
    <Avatar className={cn('', classNames)}>
      <AvatarImage src={imageSrc} />
      <AvatarFallback>
        <AvatarIcon className="w-4/5 h-4/5" />
      </AvatarFallback>
    </Avatar>
  );
};
export default UserAvatar;
