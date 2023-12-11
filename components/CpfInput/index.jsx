"use client";

import { Input } from "antd";
import { useCpfInput } from "./index.hook";

export const CpfInput = ({ onFill = undefined, ...props }) => {
  const { handleChange } = useCpfInput({onFill, ...props});
  return (
    <Input
      placeholder="XXXXX-XXX"
      {...props}
      type="text"
      maxLength={14}
      onChange={handleChange}
    />
  );
};
