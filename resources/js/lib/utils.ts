import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function ArrayRange(start: number = 0, end: number): number[] {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}
