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
      className="relative z-10 aspect-video w-full max-w-full max-xl:h-[calc(100vh-25vh)] max-lg:h-[calc(100vh-30vh)] max-md:h-[calc(100vh-200px)] xl:h-[calc(100vh-15vh)]"
      style={{
        "--swiper-pagination-color": "rgb(27 68 114 / var(--tw-bg-opacity))",
        "--swiper-pagination-bullet-inactive-color": "#999999",
        "--swiper-pagination-bullet-inactive-opacity": "1",
        "--swiper-pagination-bullet-size": "10px",
        "--swiper-pagination-bullet-horizontal-gap": "6px"
      }}
    >
      <SwiperSlide className="z-10 aspect-video">
        <SlideItem label="Comprar" src="/xbox-dualsense.jpg" />
      </SwiperSlide>
      <SwiperSlide className="z-10 aspect-video">
        <SlideItem label="Comprar" src="/dualsense-foco.jpg" />
      </SwiperSlide>
      <SwiperSlide className="z-10 aspect-video">
        <SlideItem label="Comprar" src="/dualsense-desfocado.jpg" />
      </SwiperSlide>
      <SwiperSlide className="z-10 aspect-video">
        <SlideItem label="Comprar" src="/jogatina.jpg" />
      </SwiperSlide>
    </Swiper>
  );
}

const SlideItem = ({
  children,
  className,
  src = "/pg-logo.png",
  title = "Title Lorem Upwork",
  subtitle = "Lorem lorem ld ipsum issdum",
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
        "flex h-full w-full flex-col items-center justify-end bg-cover bg-center bg-no-repeat",
        className,
      )}
    >
      <div className="style mb-4 flex w-full max-w-page-limit flex-col items-start gap-2 p-4">
        <span class="text-4xl font-bold uppercase text-white md:text-5xl">
          {title}
        </span>
        <span class="text-base font-light text-white">{subtitle}</span>
        <Link
          href="/exclusivos/bcca0ca6-09ac-4581-99fe-81ea1a780250"
          className="rounded-full bg-azul_escuro px-7 py-3 shadow-2xl"
        >
          <span className="text-base font-medium uppercase text-white">
            {label}
          </span>
        </Link>
      </div>
    </div>
  );
};
