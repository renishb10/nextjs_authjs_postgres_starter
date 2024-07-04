import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncateString(value: string, length: number) {
  if (value) {
    if (value.length <= length) return value;
    return `${value.substring(0, length)}...`;
  }
}
