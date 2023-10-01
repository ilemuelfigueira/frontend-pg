import { useState } from "react";

export function useImageSelect(props) {
  const { value: defaultValue } = props;

  const [value, setValue] = useState(() => {
    return defaultValue ? defaultValue : null;
  });

  function onChange(value) {
    if (props.onChange) props.onChange(value);
    setValue(value);
  }

  return {
    value,
    onChange,
  };
}
