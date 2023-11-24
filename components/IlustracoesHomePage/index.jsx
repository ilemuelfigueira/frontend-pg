"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Mousewheel } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

export function IlustracoesHomePage() {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      autoplay={{ delay: 2500 }}
      mousewheel={true}
      pagination={{ clickable: true }}
      modules={[Pagination, Autoplay, Mousewheel]}
      loop={true}
      className="relative z-10 aspect-video w-full max-w-full"
    >
      <SwiperSlide className="z-10">
        <img src="/xbox-dualsense.jpg" />
      </SwiperSlide>
      <SwiperSlide className="z-10">
        <img src="/dualsense-foco.jpg" />
      </SwiperSlide>
      <SwiperSlide className="z-10">
        <img src="/dualsense-desfocado.jpg" />
      </SwiperSlide>
      <SwiperSlide className="z-10">
        <img src="/jogatina.jpg" />
      </SwiperSlide>
      <header className="absolute bottom-0 left-0 z-[2] flex w-full flex-col items-start justify-center bg-black bg-opacity-30 p-2 lg:p-4">
        <span className="text-xl font-medium text-white lg:text-3xl">
          PG CUSTOM | STORE
        </span>
        <span className="text-lg font-light text-slate-100 lg:text-2xl">
          Venha conhecer a nossa loja!
        </span>
      </header>
    </Swiper>
  );
}
