"use client";

import ImageSelect from "@/components/ImageSelect";
import { useProduct } from "./index.hook";
import { Button, Carousel } from "antd";
import { getYupSchema } from "@/lib/YupSchemas";
import { twMerge } from "tailwind-merge";

const BannerImage = ({ children, ...props }) => {
  return (
    <img
      {...props}
      loading="lazy"
      className="relative aspect-square max-lg:w-full max-lg:snap-center lg:w-[48%] lg:flex-[0,0,48%] lg:rounded-xl lg:shadow-md lg:duration-300 lg:hover:shadow-xl"
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

export default function Form({ ...props }) {
  const { validationSchema, whatsappLoja = "" } = props;

  const { formik, getLabel, sendFormToWhatsapp, goToDeliveryForm } = useProduct(
    {
      WHATSAPP_LOJA: whatsappLoja,
      defaultValues: props.defaultValues,
      validationSchema: getYupSchema(validationSchema),
    },
  );

  const { values } = formik;

  const bannerShape = props.shapes?.find(
    (item) => item.value === values.shape,
  ).items;
  const bannerPaddle = values.paddles
    ? props.banners[values.paddles]
    : props.banners[Object.keys(props.banners)[0]];

  function buscarPreco(lista, value) {
    if (!lista || !value) return 0;
    return parseFloat(
      lista.find((item) => item.value == value)?.price.replace(",", "."),
    );
  }

  const prices = {
    shape: buscarPreco(props.shapes, values.shape),
    paddles: buscarPreco(props.paddles, values.paddles),
    paddlesClick: buscarPreco(props.paddlesClicks, values.paddlesClick),
    paddlesColor: buscarPreco(props.paddlesColors, values.paddlesColor),
    trigger: buscarPreco(props.triggers, values.trigger),
    grip: buscarPreco(props.grips, values.grip),
    faceplateGrip: buscarPreco(props.faceplateGrips, values.faceplateGrip),
    vibration: buscarPreco(props.vibrations, values.vibration),
  };

  const calcularTotal = () => {
    const formatter = new Intl.NumberFormat("pt-BR");

    return formatter.format(
      prices.shape +
        prices.paddles +
        prices.paddlesClick +
        prices.paddlesColor +
        prices.trigger +
        prices.grip +
        prices.faceplateGrip +
        prices.vibration,
    );
  };

  return (
    <div className="relative flex w-full max-lg:flex-col max-lg:items-center max-lg:gap-4 lg:items-start lg:justify-center lg:gap-4 max-lg:bg-white">
      <section className="#banners m-0 flex h-fit w-full min-w-[380px] max-w-[1000px] flex-wrap justify-evenly gap-3 p-0 max-lg:hidden">
        {bannerShape?.map((item) => (
          <BannerImage key={item.label} src={item.src} alt={item.label} />
        ))}
        <BannerImage
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
            <strong className="ml-2 text-xl text-green-400">
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
          onChange={formik.setFieldValue}
          name="shape"
          isBanner
          value={values.shape}
          noItemLabel
          error={formik.errors.shape}
          items={props.shapes}
        />

        <div className="#description flex w-full flex-col items-start gap-3">
          <span className="#modelName w-full font-helveticaNeue font-semibold">
            {getLabel(props.shapes, formik.values.shape)}
          </span>
          <p className="w-full font-helvetica text-sm font-light leading-6 tracking-[0.0125em]">
            {props.description}
          </p>
        </div>

        <ImageSelect
          onChange={formik.setFieldValue}
          name="paddles"
          value={values.paddles}
          error={formik.errors.paddles}
          label="PADDLES PG"
          carouselImageClassname={"data-[svg=true]:w-[94px]"}
          items={props.paddles}
        />

        <ImageSelect
          onChange={formik.setFieldValue}
          name="paddlesClick"
          value={values.paddlesClick}
          error={formik.errors.paddlesClick}
          label="OPÇÕES DE CLICKS ( PADDLES )"
          items={props.paddlesClicks}
        />

        <ImageSelect
          onChange={formik.setFieldValue}
          name="paddlesColor"
          value={values.paddlesColor}
          error={formik.errors.paddlesColor}
          label="COR DOS PADDLES"
          items={props.paddlesColors}
        />

        <ImageSelect
          onChange={formik.setFieldValue}
          name="trigger"
          value={values.trigger}
          error={formik.errors.trigger}
          label="OPÇÕES DE GATILHOS"
          items={props.triggers}
        />

        <div className="grid xl:grid-flow-col xl:auto-cols-max items-center gap-2">
          <ImageSelect
            onChange={formik.setFieldValue}
            name="grip"
            value={values.grip}
            error={formik.errors.grip}
            label="PINTURA GRIP"
            items={props.grips}
          />
          <div className="flex max-xl:hidden">
            <div className="inline-block mx-2 h-[100px] min-h-[1em] w-0.5 self-stretch bg-gray-700 opacity-100 dark:opacity-50"></div>
          </div>
          <ImageSelect
            onChange={formik.setFieldValue}
            name="faceplateGrip"
            value={values.faceplateGrip}
            error={formik.errors.faceplateGrip}
            className="lg:h-4/5"
            label="Adicionar grip ao faceplate"
            items={props.faceplateGrips}
          />
        </div>

        {/* <ImageSelect
          onChange={formik.setFieldValue}
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
          onChange={formik.setFieldValue}
          name="vibration"
          value={values.vibration}
          error={formik.errors.vibration}
          label="MOTORES DE VIBRAÇÃO"
          items={props.vibrations}
        />

        <span className="sticky bottom-0 z-50 w-full bg-white text-2xl font-bold uppercase">
          Total:
          <strong className="ml-2 text-3xl font-extrabold text-green-400">
            {calcularTotal()}
          </strong>
        </span>

        <footer className="flex w-full">
          <Button
            className="flex items-center gap-2 rounded-full"
            type="primary"
            onClick={sendFormToWhatsapp}
            size="large"
          >
            <span className="font-semibold tracking-wider">Enviar</span>
            <span className="pi pi-whatsapp"></span>
          </Button>
          <Button
            className="hidden items-center gap-2"
            type="link"
            onClick={goToDeliveryForm}
            size="large"
          >
            <span className="font-semibold tracking-wider">Próxima etapa</span>
            <span className="pi pi-send"></span>
          </Button>
        </footer>
      </section>
    </div>
  );
}
