"use client";

import { useRef, useState } from "react";
import "./index.css";
import { useEffect } from "react";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

export default function ComprePorCategoria({ ...props }) {
  const cols = props?.cols || 3;
  const galleryRef = useRef(null);

  if (!props?.items) return "";

  const [lista, _] = useState(() => {
    const items = props?.items || [];

    let groupedArray = [];

    for (let i = 0; i < items.length; i += cols) {
      groupedArray.push(items.slice(i, i + cols));
    }

    return groupedArray;
  });

  useEffect(() => {
    console.log(galleryRef.current.scrollWidth);
    console.log(galleryRef.current.style);
  }, []);
  return (
    <section
      id="compre-por-categoria-home"
      className="w-full bg-[#303030] px-4 py-6"
    >
      <span className="flex w-full justify-center text-lg text-white">
        Compre por Categoria
      </span>
      <div className="gallery-wrap mt-4 flex w-full flex-col items-center justify-start gap-5">
        <ul
          // onWheel={(evt) => {
          //   evt.preventDefault();
          //   galleryRef.current.scrollLeft += evt.deltaY;
          //   galleryRef.style.scrollBehavior = 'auto'
          // }}
          ref={galleryRef}
          className="hide-scrollbar flex w-full overflow-x-scroll"
        >
          {lista?.map((items) => (
            <li
              key={items}
              className={twMerge(
                "grid w-full flex-none grid-cols-[repeat(3,minmax(0,1fr))!important] gap-4",
                `grid-cols[repeat(${cols},minmax(0,1fr))!important]`,
              )}
            >
              {items.map((item, itemindex) => (
                <Link
                  className="relative w-full cursor-pointer"
                  href={item?.href ? item?.href : ""}
                  target="_blank"
                  style={{
                    pointerEvents: item?.href ? "auto" : "none",
                  }}
                  key={item?.src + itemindex}
                >
                  <img
                    className="aspect-square w-full"
                    src={item?.src || "/no-photo.png"}
                  />
                  <span className="absolute bottom-0 left-0 w-full bg-black/40 pl-1 text-sm text-white md:text-lg">
                    {item?.label}
                  </span>
                </Link>
              ))}
            </li>
          ))}
        </ul>

        <div className="group/button flex items-center gap-4">
          <button
            className="outline-none"
            onClick={() => {
              if (!galleryRef.current) return;

              const before = galleryRef.current.scrollLeft;

              const pagesQtd = props?.items?.length / cols;

              const pageSize = galleryRef.current.scrollWidth / pagesQtd;

              let newScroll = before - pageSize;

              if (newScroll < 0) newScroll = 0;

              galleryRef.current.scrollTo({
                left: newScroll,
                behavior: "smooth",
              });
            }}
          >
            <svg
              viewBox="0 0 29 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="aspect-square w-6 stroke-white"
            >
              <path
                d="M17.2831 7.85425L10.875 14.2624L17.2831 20.6705"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="14.5" cy="14.5" r="13.25" strokeWidth="2.5" />
            </svg>
          </button>

          <button
            className="outline-none"
            onClick={() => {
              if (!galleryRef.current) return;

              const before = galleryRef.current.scrollLeft;
              const pagesQtd = props?.items?.length / cols;
              const pageSize = galleryRef.current.scrollWidth / pagesQtd;

              let newScroll = before + pageSize;

              if (newScroll > galleryRef.current.scrollWidth)
                newScroll = galleryRef.current.scrollWidth;

              galleryRef.current.scrollTo({
                left: newScroll,
                behavior: "smooth",
              });
            }}
          >
            <svg
              viewBox="0 0 29 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="aspect-square w-6 stroke-white"
            >
              <path
                d="M12.7708 20.6704L19.179 14.2623L12.7708 7.85412"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="15.1875" cy="14.5" r="13.25" strokeWidth="2.5" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
