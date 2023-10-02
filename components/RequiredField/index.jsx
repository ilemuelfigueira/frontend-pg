import { twMerge } from "tailwind-merge";

export const RequiredField = ({ active = false, className, children }) => {
  return (
    <span data-active={active} className={twMerge(`data-[active=false]:hidden text-sm font-araboto font-semibold text-red-500`, className)}>{children}</span>
  );
};
