import paths from '@/paths';

type NavLink = {
  href: string;
  label: string;
};

export const publicLinks: NavLink[] = [
  { href: paths.homePath(), label: 'home' },
  { href: paths.aboutPath(), label: 'about' },
];

export const privateLinks: NavLink[] = [{ href: '/profile', label: 'profile' }];
