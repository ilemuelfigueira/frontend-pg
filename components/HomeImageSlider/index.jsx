"use client";

import { useCallback, useState } from "react";
import "./index.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";

export default function HomeImageSlider({ ...props }) {
  const [swiper, setSwiper] = useState(null);

  const router = useRouter();

  const handlePrevClick = useCallback(() => {
    if (swiper) {
      swiper.slidePrev();
    }
  });

  const handleNextClick = useCallback(() => {
    if (swiper) {
      swiper.slideNext();
    }
  });

  return (
    <div
      data-mode={props["data-mode"] ?? null}
      className={twMerge("flex w-full justify-center", props?.className)}
    >
      <div className="flex w-full max-w-page-limit flex-col items-center justify-start gap-4 bg-white px-4 py-6 dark:bg-[#303030]">
        <span className="flex w-full justify-center text-lg font-semibold text-black dark:text-white md:text-2xl">
          {props?.title ?? "Título"}
        </span>
        <Swiper
          loop
          breakpoints={{
            0: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 4,
            },
          }}
          onSwiper={setSwiper}
          spaceBetween={18}
          modules={[Navigation]}
          className="my-4 w-full"
        >
          {props?.items?.map((item, index) => (
            <SwiperSlide
              key={index}
              onClick={() => {
                console.debug("resres");
                router.push(item?.href || "#");
              }}
              className="group flex h-full w-full text-center hover:cursor-pointer"
            >
              <div
                style={{
                  backgroundImage: `url(${item.src || "/no-photo.png"})`,
                }}
                className="flex aspect-square w-full flex-col justify-end bg-cover bg-center bg-no-repeat"
              ></div>
              <div className="mt-2 w-full text-start text-sm text-black group-hover:text-focus-blue dark:text-white md:text-lg">
                {item?.label}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="group/button flex items-center gap-4">
          <button className="focus:!outline-none" onClick={handlePrevClick}>
            <svg
              viewBox="0 0 29 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="aspect-square w-6 stroke-black dark:stroke-white"
            >
              <path
                d="M17.2831 7.85425L10.875 14.2624L17.2831 20.6705"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="14.5" cy="14.5" r="13.25" strokeWidth="2.5" />
            </svg>
          </button>

          <button className="focus:!outline-none" onClick={handleNextClick}>
            <svg
              viewBox="0 0 29 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="aspect-square w-6 stroke-black dark:stroke-white"
            >
              <path
                d="M12.7708 20.6704L19.179 14.2623L12.7708 7.85412"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="15.1875" cy="14.5" r="13.25" strokeWidth="2.5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
