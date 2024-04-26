"use client";

import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Grid } from "swiper/modules";

import Link from "next/link";
import { twMerge } from "tailwind-merge";

export const Criadores = ({ items = [] }) => {
  return (
    <div className="w-full" key="swiper">
      <Swiper
        id="swiper-ilustracoes"
        breakpoints={{
          0: {
            slidesPerView: 2,
            grid: {
              rows: 2,
            },
          },
          768: {
            slidesPerView: 3,
            grid: {
              rows: 2,
            },
          },
          1024: {
            slidesPerView: 4,
            grid: {
              rows: 2,
            },
          },
        }}
        grid={{
          fill: "row",
        }}
        spaceBetween={8}
        loopAddBlankSlides={false}
        pagination={{ clickable: true }}
        modules={[Pagination, Grid]}
        className="relative z-10 aspect-video w-full max-w-page-limit p-4 max-md:aspect-square"
      >
        {items.length > 0 &&
          items.map((criador) => (
            <SwiperSlide key={criador.cdparceiro} className={"z-10"}>
              <SlideItem
                title={criador.nmparceiro}
                subtitle={criador.nmfuncao}
                src={criador.nmavatar}
                href={
                  criador.cdparceiro
                    ? `/parceiro/${criador.cdparceiro}`
                    : undefined
                }
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

const SlideItem = ({
  children,
  className,
  src = "/pg-logo.png",
  label = "Label",
  title = "titulo deste",
  subtitle = "subtitulo deste",
  href = "#",
  type = "link",
  ...props
}) => {
  return (
    <div
      {...props}
      style={{
        backgroundImage: `url(${src})`,
      }}
      className={twMerge(
        "flex aspect-square h-full w-full flex-col justify-end overflow-hidden rounded-md bg-cover bg-center bg-no-repeat text-white",
        className,
      )}
    >
      <Link href={href}>
        <div className="group/link flex h-fit w-full cursor-pointer flex-col items-start justify-start p-3">
          <span className="text-sm font-semibold group-hover/link:underline md:text-base lg:text-2xl">
            {title}
          </span>
          <span className="text-2xs group-hover/link:underline md:text-xs xl:text-base">
            {subtitle}
          </span>
        </div>
      </Link>
    </div>
  );
};
