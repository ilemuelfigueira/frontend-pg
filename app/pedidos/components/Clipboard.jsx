"use client";

import toast from "react-hot-toast";

export const Clipboard = ({ text }) => {
  const onCopy = () => {
    navigator.clipboard.writeText(text);
    toast.success("texto copiado!", {
      id: 'clipboard'
    });
  };

  return (
    <button onClick={onCopy}>
      <i className="pi pi-copy m-0 p-0 text-xl hover:text-slate-700"></i>
    </button>
  );
};
