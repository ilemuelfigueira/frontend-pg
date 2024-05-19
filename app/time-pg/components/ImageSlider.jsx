"use client";

import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

export default function ImageSlider() {
  const imageContainerRef = useRef(null);
  const [scrollAmount, setScrollAmount] = useState(0);

  const [width, setWitdh] = useState({
    totalWidth: 0,
    itemWidth: 0,
  });

  useEffect(() => {
    setWitdh({
      totalWidth: imageContainerRef.current.scrollWidth,
      itemWidth: imageContainerRef.current.clientWidth,
    });
  }, []);

  function scrollPrev() {
    if (scrollAmount > 0) {
      setScrollAmount((prev) => {
        const newScrollAmount = Math.max(prev - width.itemWidth, 0);
        imageContainerRef.current.scrollTo({
          left: newScrollAmount,
          behavior: "smooth",
        });
        return newScrollAmount;
      });
    }
  }

  function scrollNext() {
    setScrollAmount((prev) => {
      let newScrollAmount = prev + width.itemWidth;

      const go = prev < width.totalWidth - width.itemWidth;

      if (!go) return width.totalWidth - width.itemWidth;

      imageContainerRef.current.scrollTo({
        left: newScrollAmount,
        behavior: "smooth",
      });
      return newScrollAmount;
    });
  }
  return (
    <>
      <div className="relative flex w-full flex-col items-center justify-center gap-5">
        <span className="text-4xl font-semibold">Conheça o Time</span>

        <div className="flex items-center justify-center gap-4 xs:absolute xs:right-0">
          <button
            disabled={scrollAmount === 0}
            onClick={scrollPrev}
            className="group/button outline-none"
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
            onClick={scrollNext}
            disabled={scrollAmount >= width.totalWidth - width.itemWidth}
            className="group/button outline-none"
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
      <aside className="mb-40 mt-12 w-full">
        <ul
          ref={imageContainerRef}
          className="hide-scrollbar grid w-full max-w-full auto-cols-[100%] grid-flow-col items-center gap-4 overflow-auto xs:auto-cols-[50%] md:auto-cols-[33.333333333333336%]"
          // onScroll={() => {
          //   if(imageContainerRef.current) {
          //     const { scrollTop, scrollLeft } = imageContainerRef.current

          //     setScrollAmount({
          //       scrollTop,
          //       scrollLeft
          //     })
          //   }
          // }}
        >
          {[
            {
              avatar: "/dualsense-foco.jpg",
              title: "Annye Carolinnye",
              subtitle: "CFO, Administrativo, Atendimento",
              redes: [
                {
                  title: "Facebook",
                  href: "",
                },
                {
                  title: "Instagram",
                  href: "",
                },
                {
                  title: "Tiktok",
                  href: "",
                },
                {
                  title: "X",
                  href: "",
                },
              ],
            },
            {
              avatar: "/dualsense-foco.jpg",
              title: "Yuti Latway",
              subtitle: "CEO, Administrativo, Produção",
              redes: [
                {
                  title: "Facebook",
                  href: "",
                },
                {
                  title: "Instagram",
                  href: "",
                },
                {
                  title: "Tiktok",
                  href: "",
                },
                {
                  title: "X",
                  href: "",
                },
              ],
            },
            {
              avatar: "/dualsense-foco.jpg",
              title: "Caio Franco",
              subtitle: "CCO, Artista & Designer, Pinturas",
              redes: [
                {
                  title: "Facebook",
                  href: "",
                },
                {
                  title: "Instagram",
                  href: "",
                },
                {
                  title: "Tiktok",
                  href: "",
                },
                {
                  title: "X",
                  href: "",
                },
              ],
            },
          ].map((person) => (
            <div
              key={person.title}
              className="mt-4 flex w-full flex-col items-start"
            >
              <img className="aspect-square" src={person.avatar} />
              <span className="mt-4 w-full text-center text-2xl font-semibold">
                {person.title}
              </span>
              <span className="mt-1 w-full text-center text-sm font-light">
                {person.subtitle}
              </span>

              <ul className="mt-5 flex w-full items-center justify-center gap-2">
                {person?.redes?.map((rede) => (
                  <li key={rede.href + rede.title}>
                    {getIcon(rede.title, rede.href)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </ul>
      </aside>
    </>
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
