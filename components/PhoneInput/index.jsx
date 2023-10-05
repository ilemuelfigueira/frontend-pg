"use client";

import { aplicarMascara } from "@/lib/util";
import { Input } from "antd";

export const PhoneInput = (props) => {
  return (
    <Input
      placeholder="219123451234"
      {...props}
      type="text"
      maxLength={15}
      onChange={(e) => {
        if (!props.onChange) return;
        e.target.value = aplicarMascara(e.target.value, "telefone");

        props.onChange(e);
      }}
    />
  );
};
