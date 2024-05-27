"use client";

import { ArrowRight } from "@phosphor-icons/react";
import { Button, Input, Modal, Select } from "antd";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Mousewheel, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/mousewheel"
import Image from "next/image";

import * as yup from "yup";
import { aplicarMascara } from "@/lib/util";
import { useOpen } from "@/hooks/open";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";

const filtrosSchema = yup.object().shape({
  nmproduto: yup.string().nullable(),
  nmprodutotipo: yup.string().nullable(),
});

function FiltrosComponent({
  className,
  getQuery = () => new URLSearchParams(),
  onFilter = () => "",
  ...props
}) {
  const searchParams = useSearchParams();

  const router = useRouter();

  const getInitialValues = () => {
    let initialValues = {};
    if (searchParams.has("nmprodutotipo")) {
      const nmprodutotipo = searchParams.get("nmprodutotipo");

      initialValues.nmprodutotipo = nmprodutotipo;
    }

    if (searchParams.has("order")) {
      const order = searchParams.get("order");

      initialValues.order = ordenacoes.find((ordem) => ordem.value == order)?.value;
    }

    if (searchParams.has("nmproduto")) {
      const nmproduto = searchParams.get("nmproduto");

      initialValues.nmproduto = nmproduto;
    }

    return Object.assign(
      {
        nmproduto: "",
        nmprodutotipo: "",
        order: "",
      },
      initialValues,
    );
  };

  const ordenacoes = [
    { label: "Maior valor", value: "expensive" },
    {
      label: "Menor valor",
      value: "cheaper",
    },
  ];

  const formik = useFormik({
    initialValues: getInitialValues(),
    validationSchema: filtrosSchema,
    onSubmit: (values) => {
      onFilter(values);
      const filledValues = Object.fromEntries(
        Object.entries(values).filter(([_, v]) => v),
      );

      const query = new URLSearchParams();

      Object.keys(filledValues).forEach((key) => {
        query.set(key, filledValues[key]);
      });

      router.push(`/produtos?${query.toString()}`, {
        scroll: false,
      });
    },
  });

  return (
    <div {...props} className={twMerge("hidden space-y-4 lg:block", className)}>
      <div>
        <p className="block text-xs font-medium text-gray-700 max-md:text-lg max-md:font-semibold">
          Filtros
        </p>

        <div className="mt-2 space-y-2">
          <details className="group overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
              <span className="text-sm font-medium"> Ordem </span>

              <span className="transition group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </summary>

            <div className="border-t border-gray-200 bg-white">
              <header className="flex items-center justify-between p-4">
                <span className="text-sm text-gray-700">
                  Selecione
                </span>

                <button
                  type="button"
                  className="text-sm text-gray-900 underline underline-offset-4"
                  onClick={() => {
                    formik.resetForm({
                      values: {
                        nmprodutotipo: "",
                      },
                    });
                  }}
                >
                  Limpar
                </button>
              </header>

              <ul className="space-y-1 border-t border-gray-200 p-4">
                {ordenacoes.map((obj) => (
                  <li key={obj.value}>
                    <label
                      htmlFor={obj.value}
                      className="inline-flex cursor-pointer select-none items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        id={obj.value}
                        className="h-5 w-5 rounded border-gray-300"
                        name="order"
                        value={obj.value}
                        onChange={(e) => {
                          formik.setFieldValue(e.target.name, e.target.value);
                        }}
                        checked={formik.values.order == obj.value}
                      />

                      <span className="text-sm font-medium text-gray-700 hover:text-blue-600 hover:underline">
                        {obj.label}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </details>

          <details className="group overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
              <span className="text-sm font-medium"> Nome </span>

              <span className="transition group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </summary>

            <div className="border-t border-gray-200 bg-white">
              <div className="border-t border-gray-200 p-4">
                <div className="flex justify-between gap-4">
                  <label
                    htmlFor="FilterProductName"
                    className="flex w-full items-center gap-2"
                  >
                    <input
                      type="text"
                      id="FilterProductName"
                      placeholder="Digite o nome do produto..."
                      className="w-full rounded-md border-gray-200 shadow-sm focus:outline-none sm:text-sm"
                      name="nmproduto"
                      value={formik.values.nmproduto}
                      onChange={formik.handleChange}
                    />
                  </label>
                </div>
              </div>
            </div>
          </details>

          <details className="group overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
              <span className="text-sm font-medium"> Tipos </span>

              <span className="transition group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </summary>

            <div className="border-t border-gray-200 bg-white">
              <header className="flex items-center justify-between p-4">
                <span className="text-sm text-gray-700">Selecione um tipo</span>

                <button
                  type="button"
                  className="text-sm text-gray-900 underline underline-offset-4"
                  onClick={() => {
                    formik.resetForm({
                      values: {
                        nmprodutotipo: "",
                      },
                    });
                  }}
                >
                  Limpar
                </button>
              </header>

              <ul className="space-y-1 border-t border-gray-200 p-4">
                {props.tipos.map((tipo) => (
                  <li key={tipo.cdprodutotipo}>
                    <label
                      htmlFor={tipo.cdprodutotipo}
                      className="inline-flex cursor-pointer select-none items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        id={tipo.cdprodutotipo}
                        className="h-5 w-5 rounded border-gray-300"
                        name="nmprodutotipo"
                        value={tipo.nmprodutotipo}
                        onChange={(e) => {
                          formik.setFieldValue(e.target.name, e.target.value);
                        }}
                        checked={
                          formik.values.nmprodutotipo == tipo.nmprodutotipo
                        }
                      />

                      <span className="text-sm font-medium text-gray-700 hover:text-blue-600 hover:underline">
                        {tipo.deprodutotipo}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </details>

          <Button
            onClick={formik.handleSubmit}
            className="w-full bg-blue-500 font-light tracking-tight text-white"
          >
            Aplicar
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function ProdutosPage({ tipos, produtos }) {
  const openFilters = useOpen();

  const router = useRouter();
  const searchParams = useSearchParams();

  function getQuery() {
    const query = new URLSearchParams(searchParams);

    return query;
  }

  function nextPage(page = 1) {
    page = parseInt(page) + 1;

    updatePageQuery("page", page);
  }

  function prevPage(page = 1) {
    page = parseInt(page);

    page = page <= 1 ? 1 : page - 1;

    updatePageQuery("page", page);
  }

  function updatePageQuery(key, value) {
    const query = getQuery();

    query.set(key, value);

    router.push(`/produtos?${query.toString()}`, {
      shallow: true,
      scroll: false,
    });
  }

  const modal = useOpen();

  return (
    <div>
      <div className="mt-8 block lg:hidden">
        <button
          onClick={openFilters.handleOpen}
          className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600"
        >
          <span className="text-sm font-medium"> Filtros e ordenações </span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-4 w-4 rtl:rotate-180"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>

      <div className="mt-4 lg:mt-8 lg:grid lg:grid-cols-4 lg:items-start lg:gap-8">
        <FiltrosComponent getQuery={getQuery} tipos={tipos} />

        <Modal
          open={openFilters.open}
          onClose={openFilters.close}
          onCancel={openFilters.handleClose}
          footer={null}
        >
          <FiltrosComponent
            getQuery={getQuery}
            onFilter={openFilters.handleClose}
            className="block"
            tipos={tipos}
          />
        </Modal>

        <div className="lg:col-span-3">
          <ul className="grid grid-cols-2 gap-1 md:gap-4 md:grid-cols-4 lg:grid-cols-5">
            {produtos.items.map((produto) => (
              <li className="bg-white shadow-md" key={produto?.cdproduto}>
                <Link
                  scroll={false}
                  href={getHrefProduto(produto)}
                  className="group block overflow-hidden"
                >
                  <Swiper
                    spaceBetween={50}
                    slidesPerView={1}
                    autoplay={{ delay: 2500 }}
                    modules={[Autoplay, Mousewheel, Pagination]}
                    pagination={{
                      clickable: true
                    }}
                    loop={true}
                    className="z-10 aspect-square w-full max-w-full transition duration-500 group-hover:scale-105"
                  >
                    {produto?.banners?.map((foto) => (
                      <SwiperSlide key={foto} className="z-10">
                        <Image
                          className="object-cover"
                          fill
                          src={`${process.env.NEXT_PUBLIC_STORAGE_PUBLIC}${foto}`}
                        />
                      </SwiperSlide>
                    ))}
                    {(produto?.banners?.length || []) == 0 && (
                      <SwiperSlide className="z-10">
                        <Image
                          className="object-cover"
                          fill
                          src="/no-photo.png"
                        />
                      </SwiperSlide>
                    )}
                  </Swiper>

                  <div className="relative h-full p-4">
                    <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                      {produto.nmproduto}
                    </h3>

                    <p className="mt-2 block">
                      <span className="sr-only"> {produto.deproduto} </span>
                    </p>

                    <p className="mt-2 block text-xs">
                      {`A partir de `}
                      <strong className="text-base font-semibold">
                        R$ {aplicarMascara(produto.valorminimo, "real")}
                      </strong>
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <footer className="mt-4 flex w-full items-center justify-end gap-2 bg-inherit">
            <span className="text-sm">Produtos por página</span>
            <Select
              value={
                getQuery().has("size") ? Number(getQuery().get("size")) : 10
              }
              onChange={(value) => updatePageQuery("size", value)}
              defaultValue={10}
              size="large"
            >
              <Select.Option value={10}>10</Select.Option>
              <Select.Option value={20}>20</Select.Option>
              <Select.Option value={50}>50</Select.Option>
              <Select.Option value={100}>100</Select.Option>
            </Select>
            <div className="flex w-fit items-center justify-end gap-2">
              <Button
                disabled={produtos.page <= 1}
                onClick={() => prevPage(produtos.page)}
                icon={<ArrowLeft size={14} />}
              />
              {produtos.page} / {produtos.totalPages}
              <Button
                disabled={produtos.totalPages <= produtos.page}
                onClick={() => nextPage(produtos.page)}
                icon={<ArrowRight size={14} />}
              />
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

const isExclusivo = (produto) => {
  return produto.produto_tipo[0].nmprodutotipo == "CONTROLE_EXCLUSIVO";
};

const getHrefProduto = (produto) => {
  if (!produto) return "#";

  if (isExclusivo(produto)) return `/exclusivos/${produto.cdproduto}`;

  return `/produto/${produto.cdproduto}`;
};
