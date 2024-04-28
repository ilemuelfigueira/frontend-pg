"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Mousewheel } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { twMerge } from "tailwind-merge";

export const Ilustracoes1ParceiroCarousel = ({ items = [] }) => {
  return (
    <Swiper
      id="swiper-ilustracoes"
      breakpoints={{
        0: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 1.2,
        },
      }}
      spaceBetween={18}
      autoplay={{ delay: 2500 }}
      mousewheel={true}
      pagination={{ clickable: true }}
      modules={[Pagination, Autoplay, Mousewheel]}
      loop={true}
      zoom={true}
      className="relative z-10 aspect-square w-full max-w-page-limit p-4 pb-8"
    >
      {items.map((src) => (
        <SwiperSlide key={src} className={"z-10"}>
          <SlideItem src={src} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

const SlideItem = ({ children, className, src = "/pg-logo.png", ...props }) => {
  return (
    <div
      id="slide-container"
      {...props}
      style={{
        backgroundImage: `url(${src})`,
      }}
      className={twMerge(
        "flex aspect-[9/16] h-full w-full rounded-md bg-contain bg-center bg-no-repeat text-transparent",
        className,
      )}
    >
      .
    </div>
  );
};
