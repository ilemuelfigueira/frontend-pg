"use client";

import AspasInferior from "@/public/parceiros/Aspas_inferior";
import AspasSuperior from "@/public/parceiros/Aspas_superior";
import { useState } from "react";

export const DizemComponent = () => {
  const [opnioes, setOpnioes] = useState([
    {
      label: "The_senna",
      description:
        "Os controles da PG são uma obra de arte, são os melhores que eu ja usei em toda a minha vida. Recomendo de olhos fechados! Amo a PG < 3",
      disabled: true,
    },
    {
      label: "Bichão",
      description:
        "Os bichao da PG são uma obra de arte, são os melhores que eu ja usei em toda a minha vida. Recomendo de olhos fechados! Amo a PG < 3",
      disabled: true,
    },
    {
      label: "Savytzz",
      description:
        "Os savytzz da PG são uma obra de arte, são os melhores que eu ja usei em toda a minha vida. Recomendo de olhos fechados! Amo a PG < 3",
      disabled: false,
    },
    {
      label: "DC_Mago",
      description:
        "Os Dc_mago da PG são uma obra de arte, são os melhores que eu ja usei em toda a minha vida. Recomendo de olhos fechados! Amo a PG < 3",
      disabled: true,
    },
    {
      label: "Neymar",
      description:
        "Os Neymar da PG são uma obra de arte, são os melhores que eu ja usei em toda a minha vida. Recomendo de olhos fechados! Amo a PG < 3",
      disabled: true,
    },
  ]);

  function handleNext() {
    let arr = opnioes;

    const activeIndex = arr.findIndex((item) => item.disabled == false);

    arr[activeIndex] = {
      ...arr[activeIndex],
      disabled: true,
    };

    arr = arr.filter((_, i) => i != 0);
    arr.push(opnioes[0]);

    arr[activeIndex] = {
      ...arr[activeIndex],
      disabled: false,
    };

    setOpnioes(arr);
  }

  function getActive() {
    return opnioes.find((opniao) => opniao.disabled == false);
  }

  function handleBefore() {
    let arr = opnioes;

    const activeIndex = arr.findIndex((item) => item.disabled == false);

    arr[activeIndex] = {
      ...arr[activeIndex],
      disabled: true,
    };

    arr = arr.filter((_, i) => i != opnioes.length - 1);
    arr.unshift(opnioes[opnioes.length - 1]);

    
    arr[activeIndex] = {
      ...arr[activeIndex],
      disabled: false,
    };

    console.debug(arr)

    setOpnioes(arr);
  }
  return (
    <div
      id="frase-container"
      className="relative flex w-full max-w-page-limit flex-col items-center justify-start bg-[#E6E6E6] text-black max-md:hidden max-md:aspect-video md:aspect-[16/5]"
    >
      <span className="p-8 font-semibold md:text-xl lg:text-3xl">
        O que estão dizendo sobre nós
      </span>
      <AspasSuperior
        fill="black"
        className="absolute left-2 top-2 h-fit w-5 xs:w-8 md:w-14 lg:w-20"
      />
      <span
        onClick={handleBefore}
        className="absolute left-12 top-1/2 select-none text-lg hover:cursor-pointer active:scale-95 active:transform"
      >
        <svg
          width="15"
          height="25"
          viewBox="0 0 15 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.6066 2L1.99998 12.6066L12.6066 23.2132"
            stroke="black"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <div className="flex w-3/5 flex-col pb-10 h-full items-center justify-between gap-24">
        <span className="text-center font-light md:text-lg lg:text-xl">
          {getActive()?.description}
        </span>

        <ul className="flex w-full justify-between">
          {opnioes.map((item) => (
            <li key={item.label}>
              <span
                data-disabled={item.disabled}
                className="text-lg font-medium text-center text-black data-[disabled=true]:text-base data-[disabled=true]:text-[#929292]"
              >
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <span
        onClick={handleNext}
        className="absolute right-12 top-1/2 select-none text-lg hover:cursor-pointer active:scale-95 active:transform"
      >
        <svg
          width="15"
          height="25"
          viewBox="0 0 15 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 23.2131L12.6066 12.6065L2 1.99996"
            stroke="black"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      <AspasInferior
        fill="black"
        className="absolute bottom-2 right-2 h-fit w-5 xs:w-8 md:w-14 lg:w-20"
      />
    </div>
  );
};
