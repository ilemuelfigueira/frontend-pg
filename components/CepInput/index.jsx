"use client";

import { Input } from "antd";
import { useCepInput } from "./index.hook";

export const CepInput = ({ onFill = undefined, ...props }) => {
  const { handleChange } = useCepInput({onFill, ...props});
  return (
    <Input
      placeholder="XXXXX-XXX"
      {...props}
      type="text"
      maxLength={9}
      onChange={handleChange}
    />
  );
};
