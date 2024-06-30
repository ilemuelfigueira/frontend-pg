"use client";

import { aplicarMascara } from "@/lib/util";
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
    <ul className={twMerge("grid grid-cols-3 gap-2", className)} {...props}>
      {options.map((option, optionIndex) => (
        <li
          key={option.label + optionIndex}
          className="group peer relative grid w-full grid-cols-1 place-items-center items-center gap-2 rounded border border-slate-200 p-2 hover:cursor-pointer hover:border-blue-300 data-[checked=true]:border-2 data-[checked=true]:border-blue-400"
          style={{
            flex: "1 0 70px",
          }}
          onClick={() => {
            const newValue = option.value == value ? null : option.value;
            onChange && onChange(newValue);
          }}
          title="Clique para selecionar"
          data-checked={option.value == value}
        >
          <img className="aspect-square w-4/5" src={option.image} />
          <span
            title={option.label}
            className="overflow-hidden text-ellipsis whitespace-pre-line text-center text-xs font-light leading-tight tracking-wide hover:underline"
          >
            {option.label}
          </span>
          <span className="text-xs font-normal">
            {aplicarMascara(option.price, "real")}
          </span>
        </li>
      ))}
    </ul>
  );
}
