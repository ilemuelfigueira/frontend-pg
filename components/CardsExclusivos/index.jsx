"use client";

import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

function Card({ src, title, href = "#" }) {
  return (
    <Link
      className="relative flex aspect-square max-w-[300px] snap-center flex-col items-center justify-center gap-2 rounded-lg bg-slate-200 p-4 max-md:max-w-[150px]"
      href={href}
    >
      <img className="aspect-square w-auto" src={src} />

      <span className="absolute bottom-0 left-2 font-bold uppercase tracking-wide text-slate-800 max-lg:text-xs lg:text-xl">
        {title}
      </span>
    </Link>
  );
}

export default function CardsExclusivos() {
  return (
    <>
      <div className="relative flex w-full max-w-full flex-col items-center gap-4 2xl:w-fit">
        <header className="flex w-full items-center justify-between">
          <span className="font-bold text-slate-800 max-lg:text-xl lg:text-3xl">
            Controles Exclusivos
          </span>
        </header>

        <div className="flex w-full h-fit max-w-full gap-4 overflow-x-auto max-lg:flex-wrap max-lg:justify-center">
          <div className="flex gap-4">
            <Card
              src={`${process.env.NEXT_PUBLIC_STORAGE_PUBLIC}/produtos/png/dualsense/botoes/branco.png`}
              title={`PG Obsidian PS5`}
              href="/exclusivos/obsidian"
            />
            <Card
              src={`${process.env.NEXT_PUBLIC_STORAGE_PUBLIC}/produtos/png/dualsense/botoes/roxo.png`}
              title={`PG Speakeasy PS5`}
              href="/exclusivos/speakeasy"
            />
          </div>
          <div className="flex gap-4">
            <Card
              src={`${process.env.NEXT_PUBLIC_STORAGE_PUBLIC}/produtos/png/dualshock4/botoes/branco.png`}
              title={`PG Goliath PS4`}
              href="/exclusivos/goliath"
            />
            <Card
              src={`${process.env.NEXT_PUBLIC_STORAGE_PUBLIC}/produtos/png/xbox/botoes/branco.png`}
              title={`PG GrandMaster XBOX`}
              href="/exclusivos/grandmaster"
            />
          </div>
        </div>

        {/* <div
          ref={scroller}
          className="flex w-full snap-x snap-mandatory items-center justify-start gap-4 overflow-x-auto scroll-smooth p-4"
        >
          <Card
            src={`${process.env.NEXT_PUBLIC_STORAGE_PUBLIC}/produtos/png/dualsense/botoes/branco.png`}
            title={`Obsidian`}
            description={`A Obsidian é um controle de PS5 com design exclusivo, feito com materiais de alta qualidade e com a tecnologia DualSense, que traz uma experiência de jogo imersiva e única.`}
            href="/exclusivos/obsidian"
          />
          <Card
            src={`${process.env.NEXT_PUBLIC_STORAGE_PUBLIC}/produtos/png/dualsense/botoes/roxo.png`}
            title={`Speakeasy`}
            description={`A Speakeasy é um controle de PS5 com design exclusivo, feito com materiais de alta qualidade e com a tecnologia DualSense, que traz uma experiência de jogo imersiva e única.`}
            href="/exclusivos/speakeasy"
          />
          <Card
            src={`${process.env.NEXT_PUBLIC_STORAGE_PUBLIC}/produtos/png/dualshock4/botoes/branco.png`}
            title={`Goliath`}
            description={`A Goliath é um controle de PS5 com design exclusivo, feito com materiais de alta qualidade e com a tecnologia DualSense, que traz uma experiência de jogo imersiva e única.`}
            href="/exclusivos/goliath"
          />
          <Card
            src={`${process.env.NEXT_PUBLIC_STORAGE_PUBLIC}/produtos/png/xbox/botoes/branco.png`}
            title={`GrandMaster`}
            description={`A Obsidian é um controle de PS5 com design exclusivo, feito com materiais de alta qualidade e com a tecnologia DualSense, que traz uma experiência de jogo imersiva e única.`}
            href="/exclusivos/grandmaster"
          />
        </div> */}
      </div>
    </>
  );
}
