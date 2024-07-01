"use client";

import { aplicarMascara } from "@/lib/util";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Mousewheel, Grid } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/grid";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cadastrarPacoteCarrinhoNovo } from "@/actions/carrinho";
import toast from "react-hot-toast";
import { useFormik } from "formik";

import * as yup from "yup";
import { useRouter } from "next/navigation";

export function ProdutosParceiro({ nmparceiro = "PARCEIRO", produtos = [] }) {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      produto: undefined,
      gotocart: false,
    },
    validationSchema: yup.object().shape({
      produto: yup.object().required(),
      gotocart: yup.boolean().required(),
    }),
    onSubmit: async ({ produto, gotocart }) => {
      try {
        await cadastrarPacoteCarrinhoNovo({
          cdproduto: produto?.cdproduto,
          subprodutos: [],
        });
        if (!gotocart)
          toast.success("Produto adicionado no carrinho.", {
            id: "produto-parceiro",
          });

        if (gotocart) router.push("/carrinho");
      } catch (error) {
        if (error.message === "Usuário não autenticado")
          return toast.error(`Autentique-se.`, { id: "produto-parceiro" });
        toast.error("Erro ao adicionar produto no carrinho.", {
          id: "produto-parceiro",
        });
      }
    },
  });

  function adicionarCarrinho() {
    formik.setFieldValue("gotocart", false);
    formik.handleSubmit();
  }

  function compreAgora() {
    formik.setFieldValue("gotocart", true);
    formik.handleSubmit();
  }

  return (
    <div className="mx-4 my-6 grid grid-cols-1 gap-4 md:mx-11 md:mt-11 md:grid-cols-2">
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
          {(formik.values["produto"]?.banners ?? produtos[0]?.banners).map(
            (banner, index) => (
              <SwiperSlide key={index} className="">
                <Image
                  width={1280}
                  height={720}
                  className="!aspect-square rounded-2xl"
                  src={banner ?? "/no-photo.png"}
                />
              </SwiperSlide>
            ),
          )}
        </Swiper>
      </div>
      <div className="flex w-full flex-col items-center justify-start rounded-lg bg-white p-4">
        <span className="w-full text-start text-xl font-bold uppercase tracking-wide">
          {nmparceiro} LINHA EXCLUSIVA
        </span>
        <span className="mb-2 w-full text-start text-sm">
          {formik.values["produto"] ? "Valor " : "A partir de "}
          <strong className="text-green-400">
            {aplicarMascara(
              formik.values["produto"]?.vlproduto ??
                Math.min(...produtos.map((item) => Number(item.vlproduto))),
              "real",
            )}
          </strong>
        </span>
        <Swiper
          spaceBetween={4}
          mousewheel={true}
          breakpoints={{
            0: {
              slidesPerView: 2,
            },
            360: {
              slidesPerView: 3,
            },
            425: {
              slidesPerView: 4,
            },
          }}
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
              data-selecionado={
                produto?.cdproduto === formik.values["produto"]?.cdproduto
              }
              className="!flex flex-col gap-2 border border-transparent hover:cursor-pointer data-[selecionado=true]:border-b-blue-400"
              onClick={() => formik.setFieldValue("produto", produto)}
            >
              <Image
                src={produto?.banners[0] ?? "/no-photo.png"}
                width={1280}
                height={720}
                className="!aspect-square"
              />

              <div className="flex w-full flex-col gap-1 text-center text-xs">
                <span className="w-full whitespace-break-spaces font-semibold">
                  {produto?.nmproduto}
                </span>
                <span className="text-xs">
                  {produto?.plataformas?.join(" + ") ?? "PS5 + PC"}
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <p className="mb-6 text-xs md:mb-16">
          {formik.values["produto"]?.deproduto ?? produtos[0]?.deproduto}
        </p>
        <div className="flex w-full items-center justify-center gap-4 max-xs:flex-col xs:gap-12">
          <Button
            className="rounded-full data-[submitting=true]:animate-pulse"
            variant="outline"
            onClick={adicionarCarrinho}
            data-submitting={formik.isSubmitting}
            disabled={formik.isSubmitting}
            type="submit"
          >
            Adicionar <i className="ph ph-shopping-cart ml-1 text-xl"></i>
          </Button>
          <Button
            className="rounded-full bg-blue-800 hover:bg-blue-700 data-[submitting=true]:animate-pulse"
            onClick={compreAgora}
            data-submitting={formik.isSubmitting}
            disabled={formik.isSubmitting}
            type="submit"
          >
            Comprar agora
          </Button>
        </div>
      </div>
    </div>
  );
}
