"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Mousewheel } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

export function IlustracoesHomePage() {
  return (
    <Swiper
      id="swiper-ilustracoes"
      spaceBetween={50}
      slidesPerView={1}
      autoplay={{ delay: 2500 }}
      mousewheel={false}
      pagination={{ clickable: true }}
      modules={[Pagination, Autoplay, Mousewheel]}
      loop={true}
      zoom={true}
      className="relative z-10 aspect-video w-full max-w-full max-md:h-[calc(100vh-100px)]"
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
  );
}

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
        "flex h-full w-full flex-col items-center justify-end bg-cover bg-no-repeat bg-center py-16",
        className,
      )}
    >
      <Link
        href="/exclusivos/bcca0ca6-09ac-4581-99fe-81ea1a780250"
        className="rounded-full bg-white px-7 py-3 font-semibold text-azul_escuro shadow-2xl"
      >
        {label}
      </Link>
    </slide-container>
  );
};
