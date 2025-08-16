import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";

export const generateUUID = () => crypto.randomUUID();

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
