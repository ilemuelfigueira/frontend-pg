"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Controller, Navigation } from "swiper/modules";
import AspasSuperior from "@/public/parceiros/Aspas_superior";
import AspasInferior from "@/public/parceiros/Aspas_inferior";

export const Testimonial = ({ testimonials = [] }) => {
  const [swiperTop, setSwiperTop] = useState(null);
  const [swiperBottom, setSwiperBottom] = useState(null);

  const sliderTopRef = useRef(null);

  useEffect(() => {
    if (swiperTop && swiperBottom) {
      swiperTop.controller.control = swiperBottom;
      swiperBottom.controller.control = swiperTop;
    }
  }, [swiperTop, swiperBottom]);

  const handlePrevClick = useCallback(() => {
    if (!sliderTopRef.current) return;
    sliderTopRef.current.swiper.slidePrev();
  }, []);

  const handleNextClick = useCallback(() => {
    if (!sliderTopRef.current) return;
    sliderTopRef.current.swiper.slideNext();
  }, []);

  return (
    <div className="relative m-0 flex w-full max-w-page-limit flex-col items-center justify-center overflow-hidden bg-gray-100 p-4">
      <AspasSuperior
        fill="black"
        className="absolute left-4 top-2 hidden h-fit w-8 sm:block sm:w-10 lg:w-14"
      />
      <AspasInferior
        fill="black"
        className="absolute bottom-2 right-4 hidden h-fit w-8 sm:block sm:w-10 lg:w-14"
      />
      <h2 className="mx-4 mb-4 text-center text-lg font-semibold lg:text-3xl">
        O que estão dizendo sobre nós
      </h2>
      <Swiper
        ref={sliderTopRef}
        onSwiper={setSwiperTop}
        modules={[Navigation, Controller]}
        className="w-full max-w-2xl overflow-visible"
        spaceBetween={25}
        slidesPerView={1}
        controller={{
          control: swiperBottom,
        }}
        loop
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index} className="overflow-visible p-4 text-center">
            <p className="mx-4 mb-2 text-sm italic lg:text-lg">
              “{testimonial.text}”
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setSwiperBottom}
        modules={[Controller]}
        controller={{
          control: swiperTop,
        }}
        className="mt-4 w-full max-w-2xl"
        spaceBetween={25}
        slidesPerView={1}
        watchSlidesProgress
        loop
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index} className="text-center">
            <span className="text-gray-600">{testimonial.source}</span>
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        className="ph ph-caret-left absolute left-4 top-1/2 z-10 -translate-y-1/2 text-2xl md:text-4xl"
        onClick={handlePrevClick}
      ></button>
      <button
        className="ph ph-caret-right absolute right-4 top-1/2 z-10 -translate-y-1/2 text-2xl md:text-4xl"
        onClick={handleNextClick}
      ></button>
    </div>
  );
};

export default Testimonial;
