"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Mousewheel } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

export const Colecao = () => {
  return (
    <colecao-container className="w-full">
      <Swiper
        id="swiper-ilustracoes"
        breakpoints={{
          0: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
        }}
        spaceBetween={18}
        autoplay={{ delay: 2500 }}
        mousewheel={false}
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay, Mousewheel]}
        loop={true}
        zoom={true}
        className="relative z-10 w-full max-w-page-limit p-4 pb-8"
        style={{
          "--swiper-pagination-color": "rgb(27 68 114 / var(--tw-bg-opacity))",
          "--swiper-pagination-bullet-inactive-color": "#999999",
          "--swiper-pagination-bullet-inactive-opacity": "1",
          "--swiper-pagination-bullet-size": "10px",
          "--swiper-pagination-bullet-horizontal-gap": "6px"
        }}
      >
        <SwiperSlide className="z-10">
          <SlideItem label="Comprar" src="/xbox-dualsense.jpg" />
        </SwiperSlide>
        <SwiperSlide className="z-10">
          <SlideItem label="Comprar" src="/dualsense-foco.jpg" />
        </SwiperSlide>
        <SwiperSlide className="z-10">
          <SlideItem label="Comprar" src="/dualsense-desfocado.jpg" />
        </SwiperSlide>
        <SwiperSlide className="z-10">
          <SlideItem label="Comprar" src="/jogatina.jpg" />
        </SwiperSlide>
      </Swiper>
    </colecao-container>
  );
};

const SlideItem = ({
  children,
  className,
  src = "/pg-logo.png",
  label = "Label",
  type = "link",
  ...props
}) => {
  return (
    <slide-container
      {...props}
      style={{
        backgroundImage: `url(${src})`,
      }}
      className={twMerge(
        "flex aspect-[9/12] h-full w-full items-end overflow-hidden rounded-l-md rounded-br-md rounded-tr-[15%] bg-cover bg-center bg-no-repeat text-white",
        className,
      )}
    >
      <text-container className="flex h-fit w-full flex-col items-start justify-start gap-4 rounded-tr-xl bg-slate-800/20 p-3">
        <span className="text-lg font-normal uppercase lg:text-2xl">
          Obsidian
        </span>
        <span className="text-xs font-light lg:text-sm">
          Esse é um controle de playstation 4 que poderá ser montado da forma
          que desejar!
        </span>

        <Link
          href="/exclusivos/bcca0ca6-09ac-4581-99fe-81ea1a780250"
          className="flex items-center gap-1 text-center text-base font-semibold uppercase tracking-wide text-cyan-500 outline-none lg:text-lg"
        >
          Montar
          <i className="pi pi-chevron-right text-[14px]"></i>
        </Link>
      </text-container>
    </slide-container>
  );
};
