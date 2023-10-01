"use client";

import React from "react";
import { BreadCrumb } from "primereact/breadcrumb";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";

const iconItemTemplate = (item, options) => {
  const router = useRouter();

  function goTo(url) {
    if (!url) return;
    router.push(url);
  }

  return (
    <a
      onClick={() => goTo(item.url)}
      data-isLink={Boolean(item.url)}
      className={twMerge(
        options.className,
        "gap-2 data-[isLink=true]:cursor-pointer select-none",
      )}
    >
      <span className={item.icon}></span>
      <span className="p-menuitem-text">{item.label}</span>
    </a>
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
  const home = { icon: "pi pi-home", url: "/" };

  return (
    <>
      <header className="mb-4">{/* <nav>NAVIGATOR</nav> */}</header>
      <div className="flex w-full items-center justify-center">
        <div className="flex flex-col justify-center items-center max-lg:w-[100vw] lg:w-[90vw] xl:w-[1400px]">
          <BreadCrumb
          className="w-full"
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
    </>
  );
}
