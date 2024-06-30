"use client";

import { aplicarMascara } from "@/lib/util";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Mousewheel, Grid } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/grid";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function ProdutosParceiro({ nmparceiro = "PARCEIRO", produtos = [] }) {
  return (
    <div className="mx-11 mt-11 grid  grid-cols-1 gap-4 md:grid-cols-2">
      <div className="xs w-full">
        <Swiper
          spaceBetween={16}
          slidesPerView={2}
          breakpoints={{
            0: {
              slidesPerView: 1,
              grid: {
                rows: 1,
              },
              loop: true,
            },
            425: {
              slidesPerView: 2,
              grid: {
                rows: 2,
                fill: "row",
              },
            },
          }}
          mousewheel={true}
          modules={[Mousewheel, Grid]}
          loop={false}
          className="relative z-10 w-full max-w-full flex-1"
        >
          {[].concat(produtos[0]?.banners).map((banner, index) => (
            <SwiperSlide key={index} className="">
              <Image
                width={1280}
                height={720}
                className="!aspect-square rounded-2xl"
                src={banner ?? "/no-photo.png"}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="flex w-full flex-col items-center justify-start rounded-lg bg-white p-4">
        <span className="w-full text-start text-xl font-bold uppercase tracking-wide">
          {nmparceiro} LINHA EXCLUSIVA
        </span>
        <span className="mb-2 w-full text-start text-sm">
          a partir de{" "}
          <strong className="text-green-400">
            {aplicarMascara(999.9, "real")}
          </strong>
        </span>
        <Swiper
          spaceBetween={4}
          slidesPerView={4}
          mousewheel={true}
          pagination={{
            enabled: false,
          }}
          modules={[Pagination, Mousewheel]}
          loop={true}
          className="relative z-10 my-16 w-full max-w-full flex-1"
        >
          {produtos?.map((produto) => (
            <SwiperSlide
              key={produto.cdproduto}
              className="!flex flex-col gap-2"
            >
              <Image
                src={produto?.banners[0] ?? "/no-photo.png"}
                width={1280}
                height={720}
                className="!aspect-square"
              />

              <div className="flex w-full flex-col gap-1 text-center text-xs">
                <span className="w-full whitespace-break-spaces">
                  {produto?.nmproduto}
                </span>
                <span className="text-xs">
                  {produto?.plataformas?.join(" + ") ?? "PS5 + PC"}
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <p className="mb-16 text-xs">{produtos[0].deproduto}</p>
        <div className="flex w-full items-center justify-center gap-12">
          <Button className="rounded-full" variant="outline">
            Adicionar <i className="ph ph-shopping-cart ml-1 text-xl"></i>
          </Button>
          <Button className="rounded-full bg-blue-800 hover:bg-blue-700">
            Comprar agora
          </Button>
        </div>
      </div>
    </div>
  );
}
