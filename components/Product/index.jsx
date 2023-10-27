"use client";

import ImageSelect from "@/components/ImageSelect";
import { useProduct } from "./index.hook";
import { Button, Carousel, Popconfirm } from "antd";
import { getYupSchema } from "@/lib/YupSchemas";
import { twMerge } from "tailwind-merge";
import Image from "@/components/Image";

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

const BannerVideo = ({ children, ...props }) => {
  return (
    <video
      className={twMerge(
        "aspect-square w-[48%] flex-[0,0,48%] rounded-xl shadow-md duration-300 hover:shadow-xl",
        props?.className,
      )}
      loop={true}
      controls={true}
      muted={true}
      playsInline={true}
      autoPlay={true}
      preload="metadata"
      {...props}
      src="reflex-pro-apresentacao.mp4"
    />
  );
};

export default function Product({ ...props }) {
  const { validationSchema, whatsappLoja = "" } = props;

  const {
    formik,
    getLabel,
    sendFormToWhatsapp,
    goToDeliveryForm,
    bannerShape,
    bannerPaddle,
    prices,
    calcularTotal,
    showFaceplateGrips,
    onChange,
    confirmModal,
  } = useProduct({
    ...props,
    WHATSAPP_LOJA: whatsappLoja,
    defaultValues: props.defaultValues,
    validationSchema: getYupSchema(validationSchema),
  });

  const { values } = formik;

  return (
    <div className="relative flex w-full max-lg:flex-col max-lg:items-center max-lg:gap-4 max-lg:bg-slate-50 lg:items-start lg:justify-center lg:gap-4">
      <section className="#banners m-0 flex h-fit w-full min-w-[380px] max-w-[1000px] flex-wrap justify-evenly gap-3 p-0 max-lg:hidden">
        {bannerShape?.map((item) => (
          <BannerImage key={item.label} src={item.src} alt={item.label} />
        ))}
        <BannerImage
          className="bg-white"
          key={values.paddles}
          src={bannerPaddle}
          alt={values.paddles}
        />
      </section>
      <section className="#personalizacao flex flex-col items-start justify-start gap-8 rounded-xl p-4 opacity-100 brightness-100 max-lg:w-full lg:min-w-[520px] lg:max-w-[570px] lg:bg-white lg:shadow-lg xl:max-w-[660px]">
        <header className="#header flex w-full flex-col items-start whitespace-nowrap tracking-tighter">
          <h2 className="text-3xl font-bold">{props.title}</h2>
          <span className="text-base font-semibold tracking-wide">
            A partir de
            <strong className="ml-2 text-xl font-bold text-green-400">
              R$ {prices.shape}
            </strong>
          </span>
        </header>
        <div className="w-full md:px-8 lg:hidden">
          <Carousel effect="scrollx" className="relative aspect-square w-full">
            {bannerShape?.map((item) => (
              <BannerImage key={item.label} src={item.src} alt={item.label} />
            ))}
            <BannerImage
              key={values.paddles}
              src={bannerPaddle}
              alt={values.paddles}
            />
          </Carousel>
        </div>

        <ImageSelect
          onChange={onChange}
          name="shape"
          isBanner
          value={values.shape}
          noItemLabel
          error={formik.errors.shape}
          items={props.shapes}
        />

        <div className="#description flex w-full flex-col items-start gap-3">
          <span className="#modelName font-helveticaNeue w-full font-semibold">
            {getLabel(props.shapes, formik.values.shape)}
          </span>
          <p className="font-helvetica w-full text-sm font-light leading-6 tracking-[0.0125em]">
            {props.description}
          </p>
        </div>

        <ImageSelect
          onChange={onChange}
          name="paddles"
          value={values.paddles}
          error={formik.errors.paddles}
          label="PADDLES PG"
          carouselImageClassname={"data-[svg=true]:w-[94px]"}
          items={props.paddles}
        />

        {values.paddles != "sem" && (
          <ImageSelect
            onChange={onChange}
            name="paddlesClick"
            value={values.paddlesClick}
            error={formik.errors.paddlesClick}
            label="OPÇÕES DE CLICKS ( PADDLES )"
            items={props.paddlesClicks}
          />
        )}

        {values.paddles != "sem" && (
          <ImageSelect
            onChange={onChange}
            name="paddlesColor"
            value={values.paddlesColor}
            error={formik.errors.paddlesColor}
            label="COR DOS PADDLES"
            items={props.paddlesColors}
          />
        )}

        <ImageSelect
          onChange={onChange}
          name="trigger"
          value={values.trigger}
          error={formik.errors.trigger}
          label="OPÇÕES DE GATILHOS"
          items={props.triggers}
        />

        <div className="max-xl:flex max-xl:w-full max-xl:flex-col max-xl:items-start max-xl:gap-8 xl:grid xl:auto-cols-max xl:grid-flow-col xl:items-center xl:gap-2">
          <ImageSelect
            onChange={onChange}
            name="grip"
            value={values.grip}
            error={formik.errors.grip}
            label="PINTURA GRIP"
            items={props.grips}
          />
          {showFaceplateGrips && (
            <>
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
                items={props.faceplateGrips}
              />
            </>
          )}
        </div>

        {/* <ImageSelect
          onChange={onChange}
          name="faceplateGrip"
          value={values.faceplateGrip}
          error={formik.errors.faceplateGrip}
          label="Adicionar grip ao faceplate"
          className="sm:hidden"
          labelClassname="font-semibold text-base max-sm:uppercase"
          carouselLabelClassname="data-[svg=true]:text-lg font-helveticaNeue"
          items={props.faceplateGrips}
        /> */}

        <ImageSelect
          onChange={onChange}
          name="vibration"
          value={values.vibration}
          error={formik.errors.vibration}
          label="MOTORES DE VIBRAÇÃO"
          items={props.vibrations}
        />

        <span className="sticky bottom-2 z-50 w-full bg-white text-2xl font-bold uppercase">
          Total:
          <strong className="ml-2 text-3xl font-extrabold text-green-400">
            {calcularTotal()}
          </strong>
        </span>
        <footer className="flex justify-end gap-4 w-full">
          <div>
            <Button
              className="flex items-center rounded-[50%]"
              type="primary"
              onClick={sendFormToWhatsapp}
              size="large"
            >
              <span className="pi pi-whatsapp"></span>
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
              className="flex items-center gap-2 rounded-full hidden"
              type="default"
              onClick={() => confirmModal.trigger(true)}
              size="large"
            >
              <span className="font-semibold uppercase tracking-wider">
                Continuar
              </span>
              <span className="pi pi-right-arrow"></span>
            </Button>
          </Popconfirm>
        </footer>
      </section>
    </div>
  );
}
