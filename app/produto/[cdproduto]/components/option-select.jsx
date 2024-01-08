"use client";

import { twMerge } from "tailwind-merge";

export function OptionSelect({
  options,
  value,
  onChange,
  className,
  ...props
}) {
  if (!options || !options.length) return "Nenhuma opção disponível";

  return (
    <ul className={twMerge("flex flex-wrap gap-2", className)} {...props}>
      {options.map((option, optionIndex) => (
        <li
          key={option.label + optionIndex}
          className="group peer relative grid w-fit max-w-[70px] grid-cols-1 items-center rounded border border-slate-200 p-2 hover:cursor-pointer hover:border-blue-300 data-[checked=true]:border-2 data-[checked=true]:border-blue-400"
          style={{
            flex: "1 1 70px",
          }}
          onClick={() => {
            const newValue = option.value == value ? null : option.value;
            onChange && onChange(newValue);
          }}
          title="Clique para selecionar"
          data-checked={option.value == value}
        >
          <p
            title={option.label}
            className="text-3xs overflow-hidden text-ellipsis whitespace-pre-line text-center font-light leading-tight tracking-wide hover:underline"
          >
            {option.label}
          </p>
        </li>
      ))}
    </ul>
  );
}
