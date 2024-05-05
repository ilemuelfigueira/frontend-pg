"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Mousewheel } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Image from "next/image";

export function Ilustracoes({ imagens = [] }) {
  return (
    <section className="flex aspect-square gap-4">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
        mousewheel={true}
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay, Mousewheel]}
        loop={true}
        className="relative z-10 aspect-square w-full max-w-full flex-1"
      >
        {imagens.map((imagem, index) => (
          <SwiperSlide key={imagem} className="z-10">
            <Image
              alt={`Ilustração Nº ${index + 1}`}
              fill
              src={imagem || "/no-photo.png"}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
