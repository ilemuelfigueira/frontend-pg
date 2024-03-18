"use client";

import { floatToBRL } from "@/lib/util/intl";
import { ShoppingBag } from "@phosphor-icons/react";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import If from "../If";

export function ResumoCarrinho({ somapacotes, carrinhoVazio = false, cdcarrinho = '' }) {
  const hrefCheckout = `/checkout/${cdcarrinho}`
  return (
    <div className="w-full flex-col items-center justify-center p-4 shadow-md bg-white rounded-lg">
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
          <Link
            href="/checkout"
            className="flex h-10 w-full max-w-[400px] items-center justify-center gap-2 rounded-full bg-green-500 text-lg font-medium text-white shadow-md hover:opacity-90 md:text-xl"
          >
            Finalizar Compra
            <ShoppingBag className="text-lg md:text-2xl" />
          </Link>
        </If>
        <Link
          href={hrefCheckout}
          className="flex cursor-pointer items-center gap-2 text-base text-orange-400 hover:underline md:text-lg"
        >
          <ArrowLeft className="text-lg md:text-2xl" />
          Continuar comprando
        </Link>
      </div>
    </div>
  );
}
