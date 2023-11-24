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
      `pi pi-arrow-${direction} cursor-pointer text-lg text-red-500`,
      className,
    )}
  />
);

const Quantidade = ({ nuqtdpacote, cdpacote, maxMdHide = true }) => {
  const router = useRouter();

  const podeDiminuir = Number(nuqtdpacote) > 1;
  const podeAumentar = Number(nuqtdpacote) < 5;

  const aumentar = ({ cdpacote, nuqtdpacote }) => {
    if (!podeAumentar)
      return toast.error(
        "Não é possível aumentar a quantidade de um produto para mais de 5",
      );

    toast.loading("Aumentando quantidade do produto", {
      id: "aumentar-quantidade",
    });

    updateCarrinhoPacoteQtd(
      cdpacote,
      Number(nuqtdpacote) + 1,
      router.refresh(),
    ).then(() => {
      toast.dismiss("aumentar-quantidade");
      toast.success("Quantidade aumentada com sucesso");
    });
  };

  const diminuir = ({ cdpacote, nuqtdpacote }) => {
    if (!podeDiminuir)
      return toast.error(
        "Não é possível diminuir a quantidade de um produto para menos de 1",
      );

    toast.loading("Diminuindo quantidade do produto", {
      id: "diminuir-quantidade",
    });
    updateCarrinhoPacoteQtd(
      cdpacote,
      Number(nuqtdpacote) - 1,
      router.refresh(),
    ).then(() => {
      toast.dismiss("diminuir-quantidade");
      toast.success("Quantidade diminuida com sucesso");
    });
  };

  return (
    <div
      data-maxMdHide={maxMdHide}
      className="flex flex-col items-center data-[maxMdHide=false]:md:hidden data-[maxMdHide=true]:max-md:hidden"
    >
      <span className="text-sm text-slate-500 lg:text-2xl">Quantidade</span>
      <div className="flex items-center justify-center gap-4">
        <Arrow
          data-disabled={!podeDiminuir}
          className="data-[disabled='true']:cursor-not-allowed data-[disabled=true]:text-slate-600"
          direction="left"
          onClick={() =>
            diminuir({
              cdpacote,
              nuqtdpacote,
            })
          }
        />
        <span className="text-sm font-bold text-slate-700 lg:text-2xl">
          {nuqtdpacote}
        </span>
        <Arrow
          data-disabled={!podeAumentar}
          className="data-[disabled='true']:cursor-not-allowed data-[disabled=true]:text-slate-600"
          direction="right"
          onClick={() =>
            aumentar({
              cdpacote,
              nuqtdpacote,
            })
          }
        />
      </div>
    </div>
  );
};

const NomeProduto = ({
  nmproduto,
  nmprodutotipo,
  nmpathname,
  concat_nmsubprodutotipo,
}) => {
  return (
    <div className="flex shrink flex-col">
      <span className="text-sm text-slate-500 lg:text-2xl">
        {nmprodutotipo}
      </span>
      <Link
        href={nmpathname || "#"}
        className="text-xs font-bold text-slate-700 hover:underline lg:text-lg"
      >{`${nmproduto} - ${concat_nmsubprodutotipo}`}</Link>
    </div>
  );
};

const ImagemProduto = ({ cdpacote, nmpath, nmproduto, nmprodutotipo }) => {
  return (
    <Image
      key={cdpacote}
      className={`mb-2 aspect-[1/1] w-20 shrink-0 select-none bg-cover bg-no-repeat p-0 lg:w-40`}
      imageClassname={`h-[auto]`}
      data-banner={false}
      src={nmpath}
      alt={`Imagem do pacote ${nmproduto} do tipo ${nmprodutotipo}`}
    />
  );
};

const ValorPacote = ({ vlpacote, maxMdHide = true }) => {
  return (
    <div
      data-maxMdHide={maxMdHide}
      className="flex flex-col items-center data-[maxMdHide=false]:md:hidden data-[maxMdHide=true]:max-md:hidden"
    >
      <span className="text-sm text-center text-slate-500 lg:text-2xl">
        Preço à vista
        <br /> no pix:
      </span>
      <div className="flex gap-4">
        <span className="text-sm font-bold text-orange-500 lg:text-2xl">
          {floatToBRL(Number(vlpacote))}
        </span>
      </div>
    </div>
  );
};

const RemoverPacote = ({ cdpacote }) => {
  return (
    <span
      onClick={() => removerPacoteDoCarrinho(cdpacote, router.refresh())}
      title="Excluir produto"
      className="flex h-fit cursor-pointer items-center justify-start text-xl font-bold text-red-500"
    >
      <i className="pi pi-trash" />
    </span>
  );
};

export function Pacotes({ pacotes = [] }) {
  const router = useRouter();
  return (
    <>
      {pacotes.map((pacote) => (
        <div
          key={pacote.cdpacote}
          className="w-full flex-col gap-4 rounded-lg bg-white p-4 shadow-md max-md:rounded-none"
        >
          <div className="flex w-full justify-start max-md:gap-2 md:gap-4">
            <ImagemProduto
              cdpacote={pacote.cdpacote}
              nmpath={pacote.nmpath}
              nmproduto={pacote.nmproduto}
              nmprodutotipo={pacote.nmprodutotipo}
            />
            <NomeProduto
              concat_nmsubprodutotipo={pacote.concat_nmsubprodutotipo}
              nmpathname={pacote.nmpathname}
              nmproduto={pacote.nmproduto}
              nmprodutotipo={pacote.nmprodutotipo}
            />
            <Quantidade
              cdpacote={pacote.cdpacote}
              nuqtdpacote={pacote.nuqtdpacote}
            />
            <ValorPacote vlpacote={pacote.vlpacote} />
            <RemoverPacote cdpacote={pacote.cdpacote} />
          </div>
          <div className="flex w-full items-center justify-between">
            <ValorPacote vlpacote={pacote.vlpacote} maxMdHide={false} />

            <Quantidade
              nuqtdpacote={pacote.nuqtdpacote}
              cdpacote={pacote.cdpacote}
              maxMdHide={false}
            />
          </div>
        </div>
      ))}
    </>
  );
}
