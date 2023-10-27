"use client"

import { Spinner } from "@phosphor-icons/react";

export default function Loading() {
  return (
    <div className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute">
      <Spinner className="animate-spin" size={120} />
    </div>
  );
}
