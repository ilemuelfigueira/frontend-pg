import { twMerge } from "tailwind-merge";

export const RequiredField = ({ active = false, className, children }) => {
  return (
    <span
      data-active={active}
      className={twMerge(
        `font-araboto text-sm font-semibold text-red-500 data-[active=false]:hidden`,
        className,
      )}
    >
      {children}
    </span>
  );
};
