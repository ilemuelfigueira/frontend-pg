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
            slidesPerView: 1.05,
          },
          768: {
            slidesPerView: 2.05,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        spaceBetween={14}
        autoplay={{ delay: 2500 }}
        mousewheel={false}
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay, Mousewheel]}
        loop={true}
        zoom={true}
        className="relative z-10 aspect-video w-full max-w-page-limit p-4 max-md:h-[calc(100vh-100px)]"
      >
        <SwiperSlide className={"z-10"}>
          <SlideItem label="Comprar" src="/xbox-dualsense.jpg" />
        </SwiperSlide>
        <SwiperSlide className={"z-10"}>
          <SlideItem label="Comprar" src="/dualsense-foco.jpg" />
        </SwiperSlide>
        <SwiperSlide className={"z-10"}>
          <SlideItem label="Comprar" src="/dualsense-desfocado.jpg" />
        </SwiperSlide>
        <SwiperSlide className={"z-10"}>
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
        "flex aspect-[9/16] h-full w-full overflow-hidden rounded-l-md rounded-br-md rounded-tr-[15%] bg-cover bg-center bg-no-repeat text-white",
        className,
      )}
    >
      <text-container className="flex h-fit w-full flex-col items-start justify-start gap-4 rounded-tr-xl bg-slate-800/20 p-3">
        <span className="text-lg lg:text-2xl">Obsidian</span>
        <span className="text-xs lg:text-base">
          Esse é um controle de playstation 4 que poderá ser montado da forma
          que desejar!
        </span>

        <Link
          href="/exclusivos/bcca0ca6-09ac-4581-99fe-81ea1a780250"
          className="flex items-center gap-2 text-center text-base font-medium outline-none lg:text-lg"
        >
          Montar
          <i className="pi pi-chevron-right text-[14px]"></i>
        </Link>
      </text-container>
    </slide-container>
  );
};
