"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

export const Colecao = ({ ...props }) => {
  return (
    <div
      className={twMerge(
        "flex w-full flex-col items-center justify-start gap-4 p-4",
        props?.className,
      )}
    >
      <span className="w-full text-center text-xl font-semibold text-white md:text-4xl">
        Coleções
      </span>
      <Swiper
        id="swiper-ilustracoes"
        breakpoints={{
          0: {
            slidesPerView: 1.2,
          },
          768: {
            slidesPerView: 3,
          },
        }}
        spaceBetween={18}
        mousewheel={false}
        pagination={{ clickable: true }}
        modules={[Mousewheel]}
        loop={true}
        zoom={true}
        className="relative z-10 w-full"
        style={{
          "--swiper-pagination-color": "rgb(27 68 114 / var(--tw-bg-opacity))",
          "--swiper-pagination-bullet-inactive-color": "#999999",
          "--swiper-pagination-bullet-inactive-opacity": "1",
          "--swiper-pagination-bullet-size": "0",
          "--swiper-pagination-bullet-horizontal-gap": "6px",
          "--swiper-pagination-bullet-display": "hidden",
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
    </div>
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
    <div
      {...props}
      style={{
        backgroundImage: `url(${src})`,
      }}
      className={twMerge(
        "flex aspect-[9/12] h-full w-full items-end overflow-hidden rounded-l-md rounded-br-md rounded-tr-[15%] bg-cover bg-center bg-no-repeat text-white",
        className,
      )}
    >
      <div className="z-20 flex h-fit w-full flex-col items-start justify-start gap-1 rounded-tr-xl bg-slate-800/20 p-2 md:gap-3">
        <span className="text-lg font-normal uppercase lg:text-2xl">
          Obsidian
        </span>
        <span className="text-xs font-light lg:text-sm">
          Esse é um controle de playstation 4 que poderá ser montado da forma
          que desejar!
        </span>

        <Link
          href="/exclusivos/bcca0ca6-09ac-4581-99fe-81ea1a780250"
          className="flex h-full w-full items-center gap-1 text-center text-base font-semibold uppercase tracking-wide text-white outline-none hover:cursor-pointer hover:text-focus-blue lg:text-lg"
        >
          Montar
          <i className="ph ph-arrow-right text-2xl"></i>
        </Link>
      </div>
    </div>
  );
};
