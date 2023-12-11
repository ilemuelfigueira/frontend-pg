"use client";

import { removerEndereco, upsertEndereco } from "@/actions/enderecos";
import { objectToQueryString } from "@/lib/util";
import { PlusCircle } from "@phosphor-icons/react";
import moment from "moment";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function Enderecos({ enderecos }) {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const url = `${pathName}?${searchParams.toString()}`;
  return (
    <div>
      <span className="text-lg font-semibold"> Seus Endereços </span>

      <section className="flex w-full flex-wrap items-center justify-start gap-4">
        <Link
          style={{
            flex: "1 1 300px",
          }}
          href={`/formulario-entrega?redirect_url=${url}`}
          className="flex aspect-square flex-col items-center justify-center hover:cursor-pointer hover:text-green-500 active:text-slate-800"
        >
          <PlusCircle className="h-16 w-16" />

          <span className="text-lg font-light lg:text-xl">
            Adicionar endereço
          </span>
        </Link>
        {enderecos.map((endereco) => (
          <div
            key={endereco.cdendereco}
            style={{
              flex: "1 1 300px",
            }}
            className="flex aspect-square flex-col items-start justify-start rounded-lg bg-white p-2 text-left text-sm shadow-md"
          >
            <div
              data-padrao={endereco.flpadrao}
              className="mb-2 hidden w-full rounded-full border bg-rose-500 p-1 text-center font-semibold tracking-widest text-white data-[padrao='S']:block"
            >
              Endereço padrão
            </div>
            <span className="font-bold">{endereco.nmresponsavel}</span>
            <span className="">{endereco.nmendereco}</span>
            <span>Nº {endereco.nuendereco}</span>
            <span>
              {endereco.nmcidade} - {endereco.nmuf || endereco.nmestado}
            </span>
            <span>{endereco.nucep}</span>
            <div className="mt-auto flex w-full items-center justify-end gap-2">
              <Link
                href={`/formulario-entrega?${objectToQueryString(
                  endereco,
                )}&redirect_url=${url}`}
                className="hover:cursor-pointer hover:text-yellow-500 active:text-slate-800"
              >
                Editar
              </Link>
              |
              <button
                onClick={() =>
                  removerEndereco({ cdendereco: endereco.cdendereco }).then(
                    router.refresh,
                  )
                }
                className="hover:cursor-pointer hover:text-rose-500 active:text-slate-800"
              >
                Remover
              </button>
              |
              <button
                data-padrao={endereco.flpadrao}
                onClick={() =>
                  upsertEndereco({
                    ...endereco,
                    flpadrao: "S",
                    dtnascimento: moment(endereco.dtnascimento).format(
                      "DD/MM/YYYY",
                    ),
                  }).then(router.refresh)
                }
                className="hover:cursor-pointer hover:text-blue-500 active:text-slate-800 data-[padrao='S']:hidden"
              >
                Padrão
              </button>
            </div>
          </div>
        ))}

        <div className="hidden-flex-item w-[300px]"></div>
        <div className="hidden-flex-item w-[300px]"></div>
        <div className="hidden-flex-item w-[300px]"></div>
        <div className="hidden-flex-item w-[300px]"></div>
        <div className="hidden-flex-item w-[300px]"></div>
        <div className="hidden-flex-item w-[300px]"></div>
        <div className="hidden-flex-item w-[300px]"></div>
        <div className="hidden-flex-item w-[300px]"></div>
        <div className="hidden-flex-item w-[300px]"></div>
      </section>
    </div>
  );
}
