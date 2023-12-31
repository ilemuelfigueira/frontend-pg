"use client";

import React from "react";
import { Breadcrumb } from "antd";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HeaderNavigator } from "./Header";

const ItemTemplate = (item, options) => {
  const pathName = usePathname();

  const isActive = pathName.includes(item.url);
  return (
    <Link
      href={item.url || "#"}
      data-islink={Boolean(item.url)}
      className={twMerge(
        options.className,
        "select-none data-[islink=true]:cursor-pointer",
      )}
    >
      <span
        data-active={isActive}
        className="font-helvetica data-[active=true]:font-semibold data-[active=true]:text-black"
      >
        {item.label}
      </span>
      <span
        className={twMerge(item.icon, item.icon && item.label ? "ml-2" : "")}
      />
    </Link>
  );
};

const exclusivosItems = [
  {
    key: "1",
    label: <Link href="/exclusivos/obsidian">Obsidian</Link>,
  },
  {
    key: "2",
    label: <Link href="/exclusivos/speakeasy">Speakeasy</Link>,
  },
  {
    key: "3",
    label: <Link href="/exclusivos/grandmaster">Grandmaster</Link>,
  },
  {
    key: "4",
    label: <Link href="/exclusivos/goliath">Goliath</Link>,
  },
];

const pathsConfig = [
  {
    path: "home",
    items: [{ title: <ItemTemplate icon="pi pi-home" url="/" /> }],
  },
  {
    path: "exclusivos",
    items: [
      {
        title: <ItemTemplate label="Exclusivos" />,
        menu: { items: exclusivosItems },
      },
    ],
  },
  {
    path: "obsidian",
    items: [
      {
        title: <ItemTemplate label="Obsidian" url="/obsidian" />,
      },
    ],
  },
  {
    path: "speakeasy",
    items: [
      {
        title: <ItemTemplate label="Speakeasy" url="/speakeasy" />,
      },
    ],
  },
  {
    path: "goliath",
    items: [
      {
        title: <ItemTemplate label="Goliath" url="/exclusivos/goliath" />,
      },
    ],
  },
  {
    path: "grandmaster",
    items: [
      {
        title: (
          <ItemTemplate label="Grandmaster" url="/exclusivos/grandmaster" />
        ),
      },
    ],
  },
  {
    path: "formulario-entrega",
    items: [
      {
        title: (
          <ItemTemplate
            icon="pi pi-book"
            label="Formulário de Entrega"
            url="/formulario-entrega"
          />
        ),
      },
    ],
  },
];

const getPathsItems = (_paths) => {
  let pathsItems = [...pathsConfig[0].items];

  for (const item of _paths) {
    const path = pathsConfig.find((path) => path.path === item);

    if (!path) continue;

    pathsItems = pathsItems.concat(path.items);
  }

  return pathsItems;
};

export default function Navigator({ children, ...props }) {
  const pathName = usePathname();

  const hide = () => {
    if (pathName.includes("/login")) return true;

    return false;
  };

  const items = getPathsItems(pathName.split("/").filter((path) => path));
  return (
    <>
      <HeaderNavigator />
      <section className="flex min-h-screen flex-col items-center justify-start gap-8 max-lg:w-[100vw] lg:w-[90vw] xl:w-[1200px] 2xl:w-[1400px]">
        <Breadcrumb
          data-hide={hide()}
          style={{
            background: "transparent !important",
            border: "none !important",
          }}
          className="flex w-full px-4 data-[hide=true]:hidden"
          items={items}
        />
        {children}
      </section>
    </>
  );
}
