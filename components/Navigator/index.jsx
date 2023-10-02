"use client";

import React from "react";
import { BreadCrumb } from "primereact/breadcrumb";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { PrimeReactProvider } from "primereact/api";
import { usePassThrough } from "primereact/passthrough";
import Tailwind from "primereact/passthrough/tailwind";

const iconItemTemplate = (item, options) => {
  return (
    <Link
      href={item.url || "#"}
      data-islink={Boolean(item.url)}
      className={twMerge(
        options.className,
        "select-none data-[islink=true]:cursor-pointer",
      )}
    >
      <span className={twMerge(item.icon, 'mr-2')}></span>
      <span className="p-menuitem-text text-black">{item.label}</span>
    </Link>
  );
};

export default function Navigator({ children, ...props }) {
  const items = [
    { label: "PG Obsidian", template: iconItemTemplate },
    {
      label: "Ajustando",
      icon: "pi pi-sliders-v",
      url: "/obsidian",
      template: iconItemTemplate,
    },
  ];
  const home = { icon: "pi pi-home", url: "/", template: iconItemTemplate };

  const CustomTailwind = usePassThrough(
    Tailwind,
    { mergeSections: true, mergeProps: false },
  );

  return (
    <PrimeReactProvider
      value={{
        unstyled: true,
        pt: CustomTailwind,
      }}
      suppressHydrationWarning
    >
      <header className="mb-4">{/* <nav>NAVIGATOR</nav> */}</header>
      <div className="flex w-full items-center justify-center">
        <div className="flex flex-col items-center justify-center max-lg:w-[100vw] lg:w-[90vw] xl:w-[1400px]">
          <BreadCrumb
            pt={{
              root: 'w-full'
            }}
            style={{
              background: "transparent !important",
              border: "none !important",
            }}
            model={items}
            home={home}
          />
          {children}
        </div>
      </div>
    </PrimeReactProvider>
  );
}
