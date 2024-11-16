import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const sort = {
  byDate: (a: { date: Date }, b: { date: Date }) =>
    b.date.getTime() - a.date.getTime(),
};

export const filter = {
  arrayMatch:
    <T>(arr1: T[]) =>
    (item: T) =>
      arr1.includes(item),
};
