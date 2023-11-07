"use client";

import { updateCarrinhoPacoteQtd } from "@/actions/carrinho_pacote";
import Image from "@/components/Image";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import If from "@/components/If";
import Link from "next/link";
import { Badge } from "antd";
import { floatToBRL } from "@/lib/util/intl";
import { removerPacoteDoCarrinho } from "@/actions/excluir-pacote-carrinho";
import toast from "react-hot-toast";

const Arrow = ({
  className = "",
  active = false,
  direction = "right",
  onClick = () => {},
  ...props
}) => (
  <i
    onClick={onClick}
    data-active={active}
    className={twMerge(
      `pi pi-arrow-${direction} text-lg text-slate-700 data-[active=true]:cursor-pointer data-[active=true]:text-red-500`,
      className,
    )}
  />
);

export function Pacotes({ pacotes = [] }) {
  const router = useRouter();
  return (
    <>
      {pacotes.map((pacote) => (
        <div
          key={pacote.cdpacote}
          className="flex justify-start gap-4 rounded-lg bg-white p-4 shadow-md"
        >
          <Image
            key={pacote.cdpacote}
            className={`mb-2 aspect-[1/1] w-40 shrink-0 select-none bg-cover bg-no-repeat p-0`}
            imageClassname={`h-[auto]`}
            data-banner={false}
            src={pacote.nmpath}
            alt={`Imagem do pacote ${pacote.nmproduto}`}
          />
          <div className="flex shrink flex-col">
            <span className="text-slate-500">{pacote.nmprodutotipo}</span>
            <Link
              href={pacote.nmpathname || "#"}
              className="font-bold text-slate-700 hover:underline"
            >{`${pacote.nmproduto} - ${pacote.concat_nmsubproduto}`}</Link>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-slate-500">Quantidade</span>
            <div className="flex items-center justify-center gap-4">
              <If condition={Number(pacote.nuqtdpacote) > 1}>
                <Arrow
                  direction="left"
                  active
                  onClick={() =>
                    updateCarrinhoPacoteQtd(
                      pacote.cdpacote,
                      Number(pacote.nuqtdpacote - 1),
                      router.refresh(),
                    )
                  }
                />
              </If>
              <span className="text-2xl font-bold text-slate-700">
                {pacote.nuqtdpacote}
              </span>
              <If condition={Number(pacote.nuqtdpacote) < 5}>
                <Arrow
                  direction="right"
                  onClick={() =>
                    updateCarrinhoPacoteQtd(
                      pacote.cdpacote,
                      Number(pacote.nuqtdpacote) + 1,
                      router.refresh(),
                    )
                  }
                  active
                />
              </If>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-slate-500">Valor</span>
            <div className="flex gap-4">
              <i className="pi pi-left-arrow" />
              <span className="text-2xl font-bold text-orange-500">
                {floatToBRL(Number(pacote.vlpacote))}
              </span>
            </div>
          </div>
          <span
            onClick={() =>
              removerPacoteDoCarrinho(pacote.cdpacote, router.refresh())
            }
            title="Excluir produto"
            className="flex h-fit cursor-pointer items-center justify-start text-xl font-bold text-red-500"
          >
            <i className="pi pi-trash" />
          </span>
        </div>
      ))}
    </>
  );
}
