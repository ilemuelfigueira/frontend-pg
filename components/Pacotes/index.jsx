"use client";

import { updateCarrinhoPacoteQtd } from "@/actions/carrinho_pacote";
import Image from "@/components/Image";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
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

const Quantidade = ({
  className,
  nuqtdpacote,
  cdpacote,
  max_md_hide = true,
}) => {
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

    updateCarrinhoPacoteQtd(cdpacote, Number(nuqtdpacote) + 1, router.refresh())
      .then(() => {
        toast.dismiss("aumentar-quantidade");
        toast.success("Quantidade aumentada com sucesso.");
      })
      .catch(() => {
        toast.dismiss("aumentar-quantidade");
        toast.error("Erro ao aumentar quantidade.");
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
    updateCarrinhoPacoteQtd(cdpacote, Number(nuqtdpacote) - 1, router.refresh())
      .then(() => {
        toast.dismiss("diminuir-quantidade");
        toast.success("Quantidade diminuida com sucesso");
      })
      .catch(() => {
        toast.dismiss("aumentar-quantidade");
        toast.error("Erro ao diminuir quantidade.");
      });
  };

  return (
    <div
      data-max_md_hide={max_md_hide}
      className={twMerge(
        "data-[max_md_hide=true]:max-md:hidden data-[max_md_hide=false]:md:hidden flex flex-col items-center",
        className,
      )}
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

const ValorPacote = ({ className, vlpacote, max_md_hide = true }) => {
  return (
    <div
      data-max_md_hide={max_md_hide}
      className={twMerge(
        "data-[max_md_hide=true]:max-md:hidden data-[max_md_hide=false]:md:hidden flex flex-col items-center",
        className,
      )}
    >
      <span className="text-center text-sm text-slate-500 lg:text-2xl">
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

const RemoverPacote = ({ className, cdpacote }) => {
  const router = useRouter();

  const remover = async ({ cdpacote }) => {
    toast.loading("Removendo produto do carrinho", {
      id: "remover-produto",
    });

    removerPacoteDoCarrinho(cdpacote, router.refresh())
      .then(() => {
        toast.dismiss("remover-produto");
        toast.success("Produto removido com sucesso.");
      })
      .catch(() => {
        toast.dismiss("remover-produto");
        toast.error("Erro ao remover produto.");
      });
  };
  return (
    <span
      onClick={() => remover({ cdpacote })}
      title="Excluir produto"
      className={twMerge(
        "flex h-fit cursor-pointer items-center justify-start text-xl font-bold text-red-500",
        className,
      )}
    >
      <i className="pi pi-trash" />
    </span>
  );
};

export function Pacotes({ pacotes = [] }) {
  if (pacotes.length === 0) {
    return (
      <div className="flex w-full items-center justify-center">
        <span className="text-lg font-medium text-slate-600 md:text-xl">
          Não há produtos no carrinho
        </span>
      </div>
    );
  }
  return (
    <ul className="flex w-full flex-col gap-4">
      {pacotes.map((pacote) => (
        <li
          key={pacote.cdpacote}
          className="w-full flex-col gap-4 rounded-lg bg-white p-4 shadow-md max-md:rounded-none"
        >
          <div className="flex w-full justify-between">
            <div className="flex max-md:gap-2 md:gap-4">
              <ImagemProduto
                cdpacote={pacote.cdpacote}
                nmpath={pacote.nmpath}
                nmproduto={pacote.nmproduto}
                nmprodutotipo={pacote.nmprodutotipo}
              />
              <NomeProduto
                concat_nmsubprodutotipo={pacote.concat_nmsubprodutotipo.replace(
                  "\\n",
                  "\n",
                )}
                nmpathname={pacote.nmpathname}
                nmproduto={pacote.nmproduto}
                nmprodutotipo={pacote.nmprodutotipo}
              />
            </div>
            <div className="flex shrink-0 max-md:gap-2 md:gap-4">
              <Quantidade
                className={"max-md:hidden"}
                cdpacote={pacote.cdpacote}
                nuqtdpacote={pacote.nuqtdpacote}
              />
              <ValorPacote
                className={"max-md:hidden"}
                vlpacote={pacote.vlpacote}
              />
              <RemoverPacote cdpacote={pacote.cdpacote} />
            </div>
          </div>
          <div className="hidden w-full items-center justify-between max-md:flex">
            <ValorPacote vlpacote={pacote.vlpacote} max_md_hide={false} />

            <Quantidade
              nuqtdpacote={pacote.nuqtdpacote}
              cdpacote={pacote.cdpacote}
              max_md_hide={false}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
