"use client";

import { aplicarMascara } from "@/lib/util";
import { Input } from "antd";

export const CepInput = (props) => {
  return (
    <Input
      placeholder="XXXXX-XXX"
      {...props}
      type="text"
      maxLength={9}
      onChange={(e) => {
        if (!props.onChange) return;
        e.target.value = aplicarMascara(e.target.value, "cep");

        props.onChange(e);
      }}
    />
  );
};
