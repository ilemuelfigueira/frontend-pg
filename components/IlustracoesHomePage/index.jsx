"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Mousewheel } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import Image from "next/image";

export function IlustracoesHomePage() {
  return (
    <Swiper
      id="swiper-ilustracoes"
      spaceBetween={0}
      slidesPerView={1}
      autoplay={{ delay: 10000 }}
      mousewheel={false}
      pagination={{ clickable: true }}
      modules={[Pagination, Autoplay, Mousewheel]}
      loop={true}
      zoom={true}
      className="relative z-10 aspect-[9/13] w-full max-w-full xs:aspect-square md:aspect-video lg:aspect-[16/8] xl:aspect-[16/7]"
      style={{
        "--swiper-pagination-color": "rgb(27 68 114 / var(--tw-bg-opacity))",
        "--swiper-pagination-bullet-inactive-color": "#999999",
        "--swiper-pagination-bullet-inactive-opacity": "1",
        "--swiper-pagination-bullet-size": "10px",
        "--swiper-pagination-bullet-horizontal-gap": "6px",
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
      // style={{
      //   backgroundImage: `url(${src})`,
      // }}
      className={twMerge(
        "relative flex h-full w-full flex-col items-center justify-end bg-cover bg-center bg-no-repeat",
        className,
      )}
    >
      <Image
        src={src ?? "/no-photo.png"}
        fill
        className="absolute h-full w-full bg-cover bg-no-repeat"
        objectFit="cover"
      />
      <div className="style absolute mb-4 flex w-full max-w-page-limit flex-col items-start gap-2 p-4">
        <span className="text-4xl font-bold uppercase text-white md:text-5xl">
          {title}
        </span>
        <span className="text-base font-light text-white">{subtitle}</span>
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
