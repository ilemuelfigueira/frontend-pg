"use client";

import { useRef, useState } from "react";
import "./index.css";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

export default function HomeImageSlider({ ...props }) {
  const cols = props?.cols || 3;
  const galleryRef = useRef(null);

  const [lista, _] = useState(() => {
    const items = props?.items || [];

    let groupedArray = [];

    for (let i = 0; i < items.length; i += cols) {
      groupedArray.push(items.slice(i, i + cols));
    }

    return groupedArray;
  });

  return (
    <div data-mode={props["data-mode"] ?? null} className="w-full">
      <section
        className="relative w-full bg-white px-4 py-6 dark:bg-[#303030]"
      >
        <div className="flex w-full max-w-full items-center">
          <span className="flex w-full justify-center text-lg font-semibold text-black dark:text-white md:text-2xl lg:text-4xl">
            {props?.title ?? "Título"}
          </span>
          <div className="group/button flex items-center gap-4 self-center">
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
                width="29"
                height="29"
                viewBox="0 0 29 29"
                className="stroke-black group-disabled/button:stroke-black/30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.2832 7.85416L10.8751 14.2623L17.2832 20.6704"
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
                width="30"
                height="29"
                viewBox="0 0 30 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-black group-disabled/button:stroke-black/30"
              >
                <path
                  d="M12.771 20.6703L19.1791 14.2621L12.771 7.854"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="15.1875" cy="14.5" r="13.25" strokeWidth="2.5" />
              </svg>
            </button>
          </div>
        </div>
        <div className="gallery-wrap mt-12 flex w-full flex-col items-center justify-start gap-5">
          <ul
            // onWheel={(evt) => {
            //   evt.preventDefault();
            //   galleryRef.current.scrollLeft += evt.deltaY;
            //   galleryRef.style.scrollBehavior = 'auto'
            // }}
            ref={galleryRef}
            className="hide-scrollbar flex w-full max-w-page-limit gap-4 overflow-x-scroll"
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
                    className="relative flex w-full cursor-pointer flex-col items-start"
                    href={item?.href ? item?.href : ""}
                    target="_blank"
                    style={{
                      pointerEvents: item?.href ? "auto" : "none",
                    }}
                    key={item?.avatar + itemindex}
                  >
                    <img
                      className="aspect-square w-full"
                      src={item?.avatar || "/no-photo.png"}
                    />
                    <span className="mt-4 w-full text-center text-2xl font-semibold">
                      {item?.title}
                    </span>
                    <span className="mt-1 w-full text-center text-sm font-light">
                      {item?.subtitle}
                    </span>

                    <ul className="mt-5 flex w-full items-center justify-center gap-3">
                      {item?.redes?.map((rede) => (
                        <li key={rede.href + rede.title}>
                          {getIcon(rede.title, rede.href)}
                        </li>
                      ))}
                    </ul>
                    {/* <span className="absolute bottom-0 left-0 w-full bg-black/40 pl-1 text-sm text-white md:text-lg">
                      {item?.label}
                    </span> */}
                  </Link>
                ))}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

function getIcon(name = "", href = null) {
  switch (name.toLowerCase()) {
    case "facebook":
      return <FacebookIcon href={href} />;
    case "tiktok":
      return <TiktokIcon href={href} />;
    case "x":
      return <XIcon href={href} />;
    case "instagram":
      return <InstagramIcon href={href} />;
    case "github":
      return <GithubIcon href={href} />;
  }

  return "";
}

const FacebookIcon = ({ ...props }) => (
  <Link
    href={props?.href || ""}
    style={{
      pointerEvents: props?.href ? "auto" : "none",
    }}
    target="_blank"
  >
    <svg
      width="12"
      height="22"
      viewBox="0 0 12 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.61 11.95L11.2 8.11002H7.52V5.62002C7.52 4.57002 8.03 3.55002 9.68 3.55002H11.35V0.28002C11.35 0.28002 9.83 0.0200195 8.38 0.0200195C5.35 0.0200195 3.37 1.86002 3.37 5.19002V8.11002H0V11.95H3.37V21.22H7.52V11.95H10.61Z"
        fill="black"
      />
    </svg>
  </Link>
);

const InstagramIcon = ({ ...props }) => (
  <Link
    href={props?.href || ""}
    style={{
      pointerEvents: props?.href ? "auto" : "none",
    }}
    target="_blank"
  >
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16.4302 3.85986C15.7502 3.85986 15.2002 4.40986 15.2002 5.08986C15.2002 5.76986 15.7502 6.31986 16.4302 6.31986C17.1102 6.31986 17.6602 5.76986 17.6602 5.08986C17.6602 4.40986 17.1102 3.85986 16.4302 3.85986Z"
        fill="black"
      />
      <path
        d="M10.95 5.43994C8.09002 5.43994 5.77002 7.75994 5.77002 10.6199C5.77002 13.4799 8.09002 15.7999 10.95 15.7999C13.81 15.7999 16.13 13.4799 16.13 10.6199C16.13 7.75994 13.81 5.43994 10.95 5.43994ZM10.95 13.9399C9.12002 13.9399 7.63002 12.4499 7.63002 10.6199C7.63002 8.78994 9.12002 7.29994 10.95 7.29994C12.78 7.29994 14.27 8.78994 14.27 10.6199C14.27 12.4499 12.78 13.9399 10.95 13.9399Z"
        fill="black"
      />
      <path
        d="M15.0598 21.1401H6.65984C3.16984 21.1401 0.339844 18.3001 0.339844 14.8201V6.4201C0.339844 2.9401 3.16984 0.100098 6.65984 0.100098H15.0598C18.5498 0.100098 21.3798 2.9401 21.3798 6.4201V14.8201C21.3798 18.3101 18.5398 21.1401 15.0598 21.1401ZM6.65984 2.0801C4.26984 2.0801 2.31984 4.0301 2.31984 6.4201V14.8201C2.31984 17.2101 4.26984 19.1601 6.65984 19.1601H15.0598C17.4498 19.1601 19.3998 17.2101 19.3998 14.8201V6.4201C19.3998 4.0301 17.4498 2.0801 15.0598 2.0801H6.65984Z"
        fill="black"
      />
    </svg>
  </Link>
);

const TiktokIcon = ({ ...props }) => (
  <Link
    href={props?.href || ""}
    style={{
      pointerEvents: props?.href ? "auto" : "none",
    }}
    target="_blank"
  >
    <svg
      width="19"
      height="22"
      viewBox="0 0 19 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M18.0498 8.6101C17.8798 8.6301 17.7098 8.6401 17.5298 8.6401C15.6298 8.6401 13.8698 7.6901 12.8298 6.1001V14.7501C12.8298 18.2801 9.96981 21.1401 6.43981 21.1401C2.90981 21.1401 0.0498047 18.2801 0.0498047 14.7501C0.0498047 11.2201 2.90981 8.3601 6.43981 8.3601C6.56981 8.3601 6.6998 8.3701 6.8398 8.3801V11.5301C6.7098 11.5101 6.57981 11.4901 6.43981 11.4901C4.63981 11.4901 3.17981 12.9501 3.17981 14.7501C3.17981 16.5501 4.63981 18.0101 6.43981 18.0101C8.23981 18.0101 9.82981 16.5901 9.82981 14.7901L9.85981 0.100098H12.8698C13.1498 2.8001 15.3298 4.9101 18.0398 5.1101V8.6101"
        fill="black"
      />
    </svg>
  </Link>
);

const XIcon = ({ ...props }) => (
  <Link
    href={props?.href || ""}
    style={{
      pointerEvents: props?.href ? "auto" : "none",
    }}
    target="_blank"
  >
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.62 0C4.75 0 0 4.76 0 10.62C0 16.48 4.75999 21.24 10.62 21.24C16.48 21.24 21.24 16.48 21.24 10.62C21.24 4.76 16.48 0 10.62 0ZM13.29 16.78L9.67999 11.95L5.20999 16.78H4.06L9.17 11.26L4.09 4.47H8L11.33 8.92L15.45 4.47H16.6L11.84 9.61L17.2 16.78H13.29Z"
        fill="black"
      />
      <path
        d="M5.76953 5.31006L13.7095 15.9301H15.5095L7.56953 5.31006H5.76953Z"
        fill="black"
      />
    </svg>
  </Link>
);

const GithubIcon = ({ ...props }) => (
  <Link
    href={props?.href || ""}
    style={{
      pointerEvents: props?.href ? "auto" : "none",
    }}
    target="_blank"
  >
    <svg
      width="22"
      height="22"
      viewBox="0 0 98 96"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
        fill="#24292f"
      />
    </svg>
  </Link>
);
