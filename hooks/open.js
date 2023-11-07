import { useState } from "react";

export function useOpen(props = {}) {
  const { defaultValue } = props;

  const [open, setOpen] = useState(() => {
    if (defaultValue) return true;

    return false;
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const openClose = () => {
    setOpen((old) => !old);
  };

  return {
    open,
    handleOpen,
    handleClose,
    openClose,
  };
}
