"use client";

import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Search({ searchParams, ...props }) {
  const [inputValue, setInputValue] = useState(searchParams.search ?? "");

  const router = useRouter();

  function handleSubmit() {
    if (!inputValue) delete searchParams.search;
    if (inputValue) searchParams.search = inputValue;

    const querystring = new URLSearchParams(searchParams).toString();

    const newUrl = `/pedidos?${querystring}`;

    router.replace(newUrl);
  }

  return (
    <div className="flex items-center" {...props}>
      <Input
        value={inputValue}
        onChange={(event) => setInputValue(event.target?.value)}
        type="text"
        placeholder="Digite..."
        onKeyDown={(t) => (t.key === "Enter" ? handleSubmit() : "")}
        enterKeyHint="search"
      />
    </div>
  );
}
