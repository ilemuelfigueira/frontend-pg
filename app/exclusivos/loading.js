"use client"

import Image from "@/components/Image";

export default function Loading() {
  return (
    <div className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute">
      <Image
        src={`${process.env.NEXT_PUBLIC_STORAGE_PRODUTOS}/produtos/png/logo/logo-192x192.png`}
        className="w-[192px] aspect-square animate-bounce"
      />
    </div>
  );
}
