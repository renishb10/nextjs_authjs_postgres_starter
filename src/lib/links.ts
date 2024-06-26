type NavLink = {
  href: string;
  label: string;
};

export const publicLinks: NavLink[] = [
  { href: '/', label: 'home' },
  { href: '/about', label: 'about' },
];

export const privateLinks: NavLink[] = [{ href: '/profile', label: 'profile' }];
