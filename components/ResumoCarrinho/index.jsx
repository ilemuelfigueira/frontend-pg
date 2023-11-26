"use client";

import { floatToBRL } from "@/lib/util/intl";
import { ShoppingBag } from "@phosphor-icons/react";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { Button } from "antd";
import Link from "next/link";
import If from "../If";

export function ResumoCarrinho({ somapacotes, carrinhoVazio = false }) {
  return (
    <div className="w-full flex-col items-center justify-center p-4 shadow-md">
      <header className="flex w-full justify-between">
        <span className="text-lg font-bold text-slate-700 md:text-2xl">
          VALOR TOTAL:
        </span>
        <span className="text-lg font-bold text-slate-700 md:text-2xl">
          {floatToBRL(parseFloat(somapacotes))}
        </span>
      </header>
      <div className="mt-2 flex w-full flex-col items-center gap-2">
        <If condition={!carrinhoVazio}>
          <Button className="flex h-10 w-full max-w-[400px] items-center justify-center gap-2 text-lg md:text-2xl">
            <ShoppingBag className="text-lg md:text-2xl" /> Finalizar Compra
          </Button>
        </If>
        <Link
          href={"/"}
          className="flex cursor-pointer items-center gap-2 text-base text-orange-400 hover:underline md:text-lg"
        >
          <ArrowLeft className="text-2xl" />
          Continuar comprando
        </Link>
      </div>
    </div>
  );
}
