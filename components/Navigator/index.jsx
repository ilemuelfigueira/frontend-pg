"use client";

import React from "react";
import { BreadCrumb } from "primereact/breadcrumb";
import { twMerge } from "tailwind-merge";

const iconItemTemplate = (item, options) => {
  return (
    <a className={twMerge(options.className, "gap-2")}>
      <span className={item.icon}></span>
      <span className="p-menuitem-text">{item.label}</span>
    </a>
  );
};

export default function Navigator({ children, ...props }) {
  const items = [
    { label: "PG Obsidian" },
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
        <div className="flex flex-col justify-center max-lg:w-[100vw] lg:w-[90vw]">
          <BreadCrumb
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
