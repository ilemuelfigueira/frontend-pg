"use client";

import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

export function Order({ value, searchParams = {}, ...props }) {
  const router = useRouter();

  function handleSelect(value) {
    const splitedValue = value.split("-");

    searchParams.order = splitedValue[1];
    searchParams.orderBy = splitedValue[0];

    const querystring = new URLSearchParams(searchParams).toString();

    const newUrl = `/pedidos?${querystring}`;

    router.replace(newUrl);
  }

  return (
    <Select defaultValue={value} onValueChange={handleSelect} {...props}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Ordenação" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Ordem</SelectLabel>
          <SelectItem value="producao-asc">
            <div className="flex items-center gap-2">
              <span>Produção</span>
              <i className="ph ph-caret-up"></i>
            </div>
          </SelectItem>
          <SelectItem value="producao-desc">
            <div className="flex items-center gap-2">
              <span>Produção</span>
              <i className="ph ph-caret-down"></i>
            </div>
          </SelectItem>
          <SelectItem value="rastreio-asc">
            <div className="flex items-center gap-2">
              <span>Rastreio</span>
              <i className="ph ph-caret-up"></i>
            </div>
          </SelectItem>
          <SelectItem value="rastreio-desc">
            <div className="flex items-center gap-2">
              <span>Rastreio</span>
              <i className="ph ph-caret-down"></i>
            </div>
          </SelectItem>
          <SelectItem value="pagamento-asc">
            <div className="flex items-center gap-2">
              <span>Pagamento</span>
              <i className="ph ph-caret-up"></i>
            </div>
          </SelectItem>
          <SelectItem value="pagamento-desc">
            <div className="flex items-center gap-2">
              <span>Pagamento</span>
              <i className="ph ph-caret-down"></i>
            </div>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
