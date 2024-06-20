"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Controller, Navigation } from "swiper/modules";
import AspasSuperior from "@/public/parceiros/Aspas_superior";
import AspasInferior from "@/public/parceiros/Aspas_inferior";

export const Testimonial = ({ testimonials = [] }) => {
  const [swiperTop, setSwiperTop] = useState(null);
  const [swiperBottom, setSwiperBottom] = useState(null);

  useEffect(() => {
    if (swiperTop && swiperBottom) {
      swiperTop.controller.control = swiperBottom;
      swiperBottom.controller.control = swiperTop;
    }
  }, [swiperTop, swiperBottom]);

  const handlePrevClick = () => {
    if (swiperTop) {
      swiperTop.slidePrev();
    }
  };

  const handleNextClick = () => {
    if (swiperTop) {
      swiperTop.slideNext();
    }
  };

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
        onSwiper={setSwiperTop}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        modules={[Navigation, Controller]}
        className="w-full max-w-2xl overflow-visible"
        spaceBetween={25}
        slidesPerView={1}
        loop
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index} className="overflow-visible p-4 text-center">
            <p className="mx-4 mb-2 text-sm italic lg:text-lg">
              “{testimonial.text}”
            </p>
            <p className="mb-2 text-sm font-semibold text-gray-800 lg:text-lg">
              -{testimonial.source}
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="hidden">
        <Swiper
          onSwiper={setSwiperBottom}
          modules={[Controller]}
          className="mt-4 w-full max-w-2xl"
          spaceBetween={25}
          slidesPerView={1} // Exibir 3 slides por vez
          watchSlidesProgress // Atualiza a barra de progresso conforme os slides são arrastados
          loop
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index} className="text-center">
              <span className="text-gray-600">{testimonial.source}</span>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <button
        className="ph ph-arrow-left absolute left-4 top-1/2 -translate-y-1/2 text-2xl"
        onClick={handlePrevClick}
      ></button>
      <button
        className="ph ph-arrow-right absolute right-4 top-1/2 -translate-y-1/2 text-2xl"
        onClick={handleNextClick}
      ></button>
    </div>
  );
};

export default Testimonial;
