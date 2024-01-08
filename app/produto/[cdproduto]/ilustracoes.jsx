"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Mousewheel } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Image from "next/image";
import { useState } from "react";

export function Ilustracoes({ imagens = [] }) {
  const [swiper, setSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <section className="flex gap-1">
      <header className="flex flex-col items-start gap-2">
        {imagens.map((imagem, index) => (
          <div
            key={imagem + index}
            className="group/nav-image relative aspect-square w-10 rounded-md border border-slate-300 data-[checked=true]:border-2 data-[checked=true]:border-blue-400"
            onMouseEnter={() => swiper.slideTo(index)}
            data-checked={swiper?.activeIndex == index}
          >
            <Image
              alt={`Navegar para ilustração nª ${index}`}
              fill
              src={imagem || "/no-photo.png"}
            />
          </div>
        ))}
      </header>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{ delay: 2500 }}
        mousewheel={true}
        onSwiper={setSwiper}
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
