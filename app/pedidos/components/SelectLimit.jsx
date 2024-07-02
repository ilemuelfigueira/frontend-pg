"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectLimit({
  value = 5,
  onChange = () => {},
  disabled = false,
}) {
  return (
    <>
      <Select disabled={disabled} value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Ordenação" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Tamanho</SelectLabel>
            <SelectItem value={5}>
              <span>5</span>
            </SelectItem>
            <SelectItem value={10}>
              <span>10</span>
            </SelectItem>
            <SelectItem value={15}>
              <span>15</span>
            </SelectItem>
            <SelectItem value={20}>
              <span>20</span>
            </SelectItem>
            <SelectItem value={30}>
              <span>30</span>
            </SelectItem>
            <SelectItem value={50}>
              <span>50</span>
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
