"use client"

import { CircleDashed } from "@phosphor-icons/react";

export default function Loading() {
  return (
    <div className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute">
      <CircleDashed className="animate-spin text-2xl" size={150} />
    </div>
  );
}
