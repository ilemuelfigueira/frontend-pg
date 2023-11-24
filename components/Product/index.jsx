"use client";

import ImageSelect, { ImageSelectLoading } from "@/components/ImageSelect";
import { useProduct } from "./index.hook";
import { Button, Popconfirm } from "antd";
import { getYupSchema } from "@/lib/YupSchemas";
import { twMerge } from "tailwind-merge";
import Image from "@/components/Image";
import { serializeLabel, serializeStrongLabel } from "@/lib/util/string";
import { getFirstItem } from "@/lib/util/array";
import If from "@/components/If";
import { floatToBRL } from "@/lib/util/intl";
import { ShoppingCart } from "@phosphor-icons/react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, Mousewheel, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";

const BannerImage = ({ children, ...props }) => {
  return (
    <Image
      {...props}
      loading="lazy"
      imageClassname="lg:rounded-xl"
      className={twMerge(
        "relative aspect-square max-lg:w-full max-lg:snap-center lg:w-[48%] lg:flex-[0,0,48%] lg:rounded-xl lg:shadow-md lg:duration-300 lg:hover:shadow-xl",
        props.className,
      )}
    />
  );
};

const BannerSubProduto = ({ items = [] }) => {
  if (items.length == 0)
    return (
      <span className="text-2xl font-bold">
        Erro ao carregar fotos do subproduto.
      </span>
    );

  return items.map((foto) => (
    <BannerImage
      className="bg-white"
      key={foto?.nmpath}
      src={foto?.nmpath}
      alt={foto?.nmsubproduto}
    />
  ));
};

const subProdutosToSelect = (
  subproduto,
  subprodutosFotos,
  subprodutosPrecos,
) => {
  const foto = subprodutosFotos.find(
    (item) => item.cdsubproduto == subproduto.cdsubproduto,
  );

  const preco = subprodutosPrecos.find(
    (item) => item.cdsubproduto == subproduto.cdsubproduto,
  );

  return {
    label: serializeLabel(subproduto.nmsubproduto),
    strongLabel: serializeStrongLabel(subproduto.nmsubproduto),
    value: subproduto.cdsubproduto,
    src: foto?.nmpath || "/logo-192x192.png",
    aspect: foto?.nmaspect,
    price: preco?.vlsubproduto,
  };
};

const mapSubProdutosToSelect = (
  subprodutos = [],
  subprodutosFotos = [],
  subprodutosPrecos = [],
) => {
  return subprodutos.map((item) =>
    subProdutosToSelect(item, subprodutosFotos, subprodutosPrecos),
  );
};

export default function Product({ ...props }) {
  const {
    validationSchema,
    whatsappLoja = "",
    produto,
    subprodutos,
    subprodutosFotos,
    subprodutosPrecos,
  } = props;

  const { formik, sendFormToWhatsapp, onChange } = useProduct({
    ...props,
    WHATSAPP_LOJA: whatsappLoja,
    defaultValues: props.defaultValues,
    validationSchema: getYupSchema(validationSchema),
  });

  if (!produto) throw new Error("O campo produto é obrigatório");

  const { values } = formik;

  const valorSubProduto = (arr = [], cdsubproduto) => {
    const preco = arr.find((item) => item.cdsubproduto == cdsubproduto);

    return floatToBRL(preco?.vlsubproduto);
  };

  const getNmSubProduto = (arr = [], cdsubproduto) => {
    const result = arr.find((item) => item.cdsubproduto == cdsubproduto);

    return result?.nmsubproduto;
  };

  const total = (subprodutosPrecos, subprodutosIds) => {
    const arr = subprodutosPrecos.filter((item) =>
      subprodutosIds.includes(item.cdsubproduto),
    );

    return floatToBRL(
      arr.reduce((acc, curr) => acc + Number(curr.vlsubproduto), 0),
    );
  };

  const getSubProdutosFotosPorTipo = (fotos = [], tipo = "") => {
    return fotos.filter(
      (item) =>
        item.nmsubprodutofototipo == tipo ||
        item.nmsubprodutofototipo == "BANNER/AVATAR",
    );
  };

  const getSubProdutosPorTipo = (subprodutos = [], tipo = "") => {
    return subprodutos.filter(
      (item) =>
        item.nmsubprodutotipo == tipo ||
        item.nmsubprodutofototipo == "BANNER/AVATAR",
    );
  };

  const getSubProdutosFotosPorCdSubProduto = (
    subprodutosFotos = [],
    cdsubproduto = "",
  ) => {
    return subprodutosFotos.filter((item) => item.cdsubproduto == cdsubproduto);
  };

  const getSemPaddlesId = (paddles) =>
    paddles?.find((paddle) =>
      paddle?.nmsubproduto?.toLowerCase()?.includes("sem"),
    )?.cdsubproduto;

  const server = {
    shapes: getSubProdutosPorTipo(subprodutos, "SHAPE"),
    paddles: getSubProdutosPorTipo(subprodutos, "PADDLE"),
    paddlesClicks: getSubProdutosPorTipo(subprodutos, "PADDLE_CLICK"),
    paddlesColors: getSubProdutosPorTipo(subprodutos, "PADDLE_COLOR"),
    triggerClicks: getSubProdutosPorTipo(subprodutos, "TRIGGER_CLICK"),
    grips: getSubProdutosPorTipo(subprodutos, "GRIP"),
    faceplateGrips: getSubProdutosPorTipo(subprodutos, "FACEPLATE_GRIP"),
    vibrations: getSubProdutosPorTipo(subprodutos, "VIBRATION"),
  };

  const semPaddlesId = getSemPaddlesId(server.paddles);

  return (
    <>
      <div className="relative flex w-full max-lg:flex-col max-lg:items-center max-lg:gap-4 lg:items-start lg:justify-center lg:gap-4">
        <section className="#banners sticky top-20 m-0 flex h-fit w-full min-w-[380px] max-w-[1000px] animate-slideInLeftSlow flex-wrap justify-evenly gap-3 p-0 max-lg:hidden">
          <If
            condition={server.shapes.length > 0}
            fallback={"Nenhum shape encontrado."}
          >
            <BannerSubProduto
              items={getSubProdutosFotosPorTipo(
                getSubProdutosFotosPorCdSubProduto(
                  subprodutosFotos,
                  values.shape || server.shapes[0].cdsubproduto,
                ),
                "BANNER",
              )}
            />
          </If>

          <If
            condition={server.paddles.length > 0}
            fallback={<span>Erro ao carregar paddles.</span>}
          >
            <BannerSubProduto
              items={getSubProdutosFotosPorTipo(
                getSubProdutosFotosPorCdSubProduto(
                  subprodutosFotos,
                  values.paddles || server.paddles[0].cdsubproduto,
                ),
                "BANNER",
              ).slice(0, 1)}
            />
          </If>
        </section>
        <section className="#personalizacao flex animate-appearSlow flex-col items-start justify-start gap-8 rounded-xl p-4 max-lg:w-full lg:min-w-[520px] lg:max-w-[570px] lg:bg-white lg:shadow-lg xl:max-w-[660px]">
          <header className="#header flex w-full flex-col items-start whitespace-nowrap tracking-tighter">
            <span className="text-3xl font-bold">{props.title}</span>
            <span className="text-base font-semibold tracking-wide">
              A partir de
              <strong className="ml-2 text-xl font-bold text-green-400">
                <If
                  condition={server.shapes.length > 0}
                  fallback={<span>Erro carregando preço inicial</span>}
                >
                  {valorSubProduto(
                    subprodutosPrecos,
                    values.shape || getFirstItem(server.shapes)?.cdsubproduto,
                  )}
                </If>
              </strong>
            </span>
          </header>
          <div className="w-full md:px-8 lg:hidden">
            <If
              condition={server.shapes.length > 0 && server.paddles.length > 0}
            >
              <Swiper
                direction="horizontal"
                autoplay={{
                  delay: 5000,
                  stopOnLastSlide: false,
                }}
                pagination={{
                  clickable: true,
                }}
                scrollbar={{
                  enabled: true,
                }}
                rewind={true}
                className="aspect-square w-full"
                modules={[Pagination, Autoplay, Mousewheel]}
              >
                {getSubProdutosFotosPorTipo(
                  getSubProdutosFotosPorCdSubProduto(
                    subprodutosFotos,
                    values.shape || server.shapes[0].cdsubproduto,
                  ),
                  "BANNER",
                ).map((foto) => (
                  <SwiperSlide key={foto?.nmpath}>
                    <BannerImage
                      className="bg-white"
                      src={foto?.nmpath}
                      alt={foto?.nmsubproduto}
                    />
                  </SwiperSlide>
                ))}

                <If
                  condition={server.paddles.length > 0}
                  fallback={<span>Erro ao carregar paddles.</span>}
                >
                  {getSubProdutosFotosPorTipo(
                    getSubProdutosFotosPorCdSubProduto(
                      subprodutosFotos,
                      values.paddles || server.paddles[0].cdsubproduto,
                    ),
                    "BANNER",
                  )
                    .slice(0, 1)
                    .map((foto) => (
                      <SwiperSlide key={foto?.nmpath}>
                        <BannerImage
                          className="bg-white"
                          src={foto?.nmpath}
                          alt={foto?.nmsubproduto}
                        />
                      </SwiperSlide>
                    ))}
                </If>
              </Swiper>
            </If>
          </div>

          <If
            condition={server.shapes.length > 0}
            fallback={<span>Erro ao carregar shapes</span>}
          >
            <ImageSelect
              onChange={onChange}
              name="shape"
              isBanner
              value={values.shape}
              noItemLabel
              error={formik.errors.shape}
              items={mapSubProdutosToSelect(
                server.shapes,
                getSubProdutosFotosPorTipo(subprodutosFotos, "AVATAR"),
                subprodutosPrecos,
              )}
            />
          </If>

          <div className="#description flex w-full flex-col items-start gap-3">
            <span className="#modelName font-helveticaNeue w-full font-semibold">
              <If
                condition={server.shapes.length > 0}
                fallback={<span>...</span>}
              >
                {getNmSubProduto(
                  server.shapes,
                  values.shape ||
                    getFirstItem(server.shapes.filter)?.cdsubproduto,
                )}
              </If>
            </span>
            <p className="font-helvetica w-full text-sm font-light leading-6 tracking-[0.0125em]">
              {produto.deproduto}
            </p>
          </div>

          <If
            condition={server.paddles.length > 0}
            fallback={<span>Erro ao carregar paddles</span>}
          >
            <ImageSelect
              onChange={(key, value) => {
                if (value == semPaddlesId) {
                  formik.setFieldValue("hidePaddles", "S");
                } else {
                  formik.setFieldValue("hidePaddles", "N");
                }
                return onChange(key, value);
              }}
              name="paddles"
              value={values.paddles}
              error={formik.errors.paddles}
              label="PADDLES PG"
              carouselImageClassname={"data-[svg=true]:w-[94px]"}
              items={mapSubProdutosToSelect(
                server.paddles,
                getSubProdutosFotosPorTipo(subprodutosFotos, "AVATAR"),
                subprodutosPrecos,
              )}
            />
          </If>

          <If condition={server.paddlesClicks.length > 0}>
            {values.hidePaddles != "S" && (
              <ImageSelect
                onChange={onChange}
                name="paddlesClick"
                value={values.paddlesClick}
                error={formik.errors.paddlesClick}
                label="OPÇÕES DE CLICKS ( PADDLES )"
                items={mapSubProdutosToSelect(
                  server.paddlesClicks,
                  getSubProdutosFotosPorTipo(subprodutosFotos, "AVATAR"),
                  subprodutosPrecos,
                )}
              />
            )}
          </If>

          <If condition={server.paddlesClicks.length > 0}>
            {values.hidePaddles != "S" && (
              <ImageSelect
                onChange={onChange}
                name="paddlesColor"
                value={values.paddlesColor}
                error={formik.errors.paddlesColor}
                label="COR DOS PADDLES"
                items={mapSubProdutosToSelect(
                  server.paddlesColors,
                  getSubProdutosFotosPorTipo(subprodutosFotos, "AVATAR"),
                  subprodutosPrecos,
                )}
              />
            )}
          </If>

          <If condition={server.triggerClicks.length > 0}>
            <ImageSelect
              onChange={onChange}
              name="trigger"
              value={values.trigger}
              error={formik.errors.trigger}
              label="OPÇÕES DE GATILHOS"
              items={mapSubProdutosToSelect(
                server.triggerClicks,
                getSubProdutosFotosPorTipo(subprodutosFotos, "AVATAR"),
                subprodutosPrecos,
              )}
            />
          </If>

          <div className="max-xl:flex max-xl:w-full max-xl:flex-col max-xl:items-start max-xl:gap-8 xl:grid xl:auto-cols-max xl:grid-flow-col xl:items-center xl:gap-2">
            <If condition={server.grips.length > 0}>
              <ImageSelect
                onChange={onChange}
                name="grip"
                value={values.grip}
                error={formik.errors.grip}
                label="PINTURA GRIP"
                items={mapSubProdutosToSelect(
                  server.grips,
                  getSubProdutosFotosPorTipo(subprodutosFotos, "AVATAR"),
                  subprodutosPrecos,
                )}
              />
            </If>
            <If condition={server.faceplateGrips.length > 0}>
              <div className="flex max-xl:hidden">
                <div className="mx-2 inline-block h-[100px] min-h-[1em] w-0.5 self-stretch bg-gray-700 opacity-100 dark:opacity-50"></div>
              </div>
              <ImageSelect
                onChange={onChange}
                name="faceplateGrip"
                value={values.faceplateGrip}
                error={formik.errors.faceplateGrip}
                className="lg:h-4/5"
                label="Adicionar grip ao faceplate"
                items={mapSubProdutosToSelect(
                  server.faceplateGrips,
                  getSubProdutosFotosPorTipo(subprodutosFotos, "AVATAR"),
                  subprodutosPrecos,
                )}
              />
            </If>
          </div>

          <If condition={server.vibrations.length > 0}>
            <ImageSelect
              onChange={onChange}
              name="vibration"
              value={values.vibration}
              error={formik.errors.vibration}
              label="MOTORES DE VIBRAÇÃO"
              items={mapSubProdutosToSelect(
                server.vibrations,
                getSubProdutosFotosPorTipo(subprodutosFotos, "AVATAR"),
                subprodutosPrecos,
              )}
            />
          </If>

          <span className="sticky bottom-2 z-20 w-full bg-white text-2xl font-bold uppercase">
            Total:
            <strong className="ml-2 text-3xl font-extrabold text-green-400">
              {total(subprodutosPrecos, [
                values.shape,
                values.paddles,
                values.paddlesClick,
                values.paddlesColor,
                values.trigger,
                values.grip,
                values.faceplateGrip,
                values.vibration,
              ])}
            </strong>
          </span>
          <footer className="flex w-full flex-col items-center gap-4">
            <div>
              <Button
                className="flex min-w-[250px] bg-lime-500 text-white items-center justify-center gap-2 rounded-full shadow-lg"
                type="text"
                onClick={sendFormToWhatsapp}
                size="large"
              >
                <span className="flex items-center gap-1 font-semibold uppercase tracking-wider">
                  COMPARTILHAR
                </span>
                <WhatsappLogo size={32} />
              </Button>
            </div>

            <Popconfirm
              title="Finalizar o pedido"
              description="Tem certeza que quer finalizar o pedido?"
              onConfirm={formik.handleSubmit}
              okText="Sim"
              cancelText="Não"
            >
              <Button
                className="flex min-w-[250px] items-center justify-center gap-2 rounded-full shadow-lg"
                type="text"
                size="large"
              >
                <span className="font-semibold uppercase tracking-wider">
                  Adicionar
                </span>
                <ShoppingCart size={32} />
              </Button>
            </Popconfirm>
          </footer>
        </section>
      </div>
    </>
  );
}
