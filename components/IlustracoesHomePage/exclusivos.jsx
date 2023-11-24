"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Mousewheel } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

export function IlustracoesExclusivos() {
  return (
    <div className="w-[500px] h-[500px]">
      <Swiper
        // direction="vertical"
        // spaceBetween={0}
        slidesPerView={2}
        autoplay={{ delay: 2500 }}
        mousewheel={true}
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay, Mousewheel]}
        loop={true}
        className="relative w-full h-full"
      >
        <SwiperSlide>
          <img src="https://ljgdfxvbwvrxsltyjutg.supabase.co/storage/v1/object/public/produtos/png/dualsense/botoes/branco.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://ljgdfxvbwvrxsltyjutg.supabase.co/storage/v1/object/public/produtos/png/dualsense/botoes/rosa.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://ljgdfxvbwvrxsltyjutg.supabase.co/storage/v1/object/public/produtos/png/dualsense/botoes/roxo.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://ljgdfxvbwvrxsltyjutg.supabase.co/storage/v1/object/public/produtos/png/dualsense/botoes/azul_claro.png" />
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
    </div>
  );
}
