"use client";

import ImageSelect from "@/components/ImageSelect";
import { useProductForm } from "./form";
import { Button } from "primereact/button";

export default function Form() {
  const { formik } = useProductForm();

  const { values } = formik;

  return (
    <div className="#personalizacao flex w-[100vw] flex-col items-start justify-start gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-lg max-lg:w-full lg:min-w-[520px] lg:max-w-[560px] xl:max-w-[660px]">
      <div className="#header flex w-full flex-col items-start whitespace-nowrap tracking-tighter max-lg:hidden">
        <h2 className="flex-1 font-helvetica text-4xl font-black tracking-tighter">
          PG OBSIDIAN
        </h2>
        <span className="font-helvetica text-base font-semibold tracking-wide">
          a partir de <strong className="text-green-400">R$ 399,99</strong>
        </span>
      </div>

      <ImageSelect
        onChange={formik.setFieldValue}
        name="shape"
        value={values.shape}
        error={formik.errors.shape}
        label=""
        items={[
          {
            src: "reflex-pro-white-icon.png",
            price: "00,00",
            value: "reflex-pro-white",
          },
          {
            src: "reflex-pro-black-icon.png",
            price: "00,00",
            value: "reflex-pro-black",
          },
          {
            src: "reflex-pro-blue-icon.png",
            price: "00,00",
            value: "reflex-pro-blue",
          },
          {
            src: "reflex-pro-red-icon.png",
            price: "00,00",
            value: "reflex-pro-red",
          },
          {
            src: "reflex-pro-steelgray-icon.png",
            price: "00,00",
            value: "reflex-pro-steelgray",
          },
          {
            src: "reflex-pro-whitecherry2023-icon.png",
            price: "00,00",
            value: "reflex-pro-whitecherry2023",
          },
          {
            src: "reflex-pro-orange-icon.png",
            price: "00,00",
            value: "reflex-pro-orange",
          },
        ]}
      />

      <div className="#description flex w-full flex-col items-start gap-3">
        <span className="#modelName w-full font-helveticaNeue font-semibold">
          White
        </span>
        <p className="w-full font-helvetica text-sm font-light leading-6 tracking-[0.0125em]">
          Introducing SCUF Reflex Pro, designed to live up to its name. With
          four removable & remappable rear paddles, three on-board configuration
          profiles, adaptive triggers, interchangable thumbsticks, and non-slip
          performance grip. With Reflex Pro, be unstoppable. The Reflex comes
          standard with a black universal protection case, a 6-foot USB-C cable,
          4 extra thumbsticks.
        </p>
      </div>

      <ImageSelect
        onChange={formik.setFieldValue}
        name="paddles"
        value={values.paddles}
        error={formik.errors.paddles}
        label="PADDLES PG"
        carouselImageClassname={"data-[svg=true]:w-[90px]"}
        items={[
          {
            label: "2 Paddles Fat",
            src: "cliente/svg/2_paddle_fat.svg",
            price: "00,00",
            value: "2paddles",
          },
          {
            label: "4 Paddles Slim",
            src: "cliente/svg/4_paddle_slim.svg",
            price: "00,00",
            value: "4paddles",
          },
        ]}
      />

      <ImageSelect
        onChange={formik.setFieldValue}
        name="paddlesClick"
        value={values.paddlesClick}
        error={formik.errors.paddlesClick}
        label="OPÇÕES DE CLICKS ( PADDLES )"
        items={[
          {
            label: "Click tactil",
            src: "cliente/svg/click_tactil_redondo.svg",
            price: "00,00",
            value: "tactil",
          },
          {
            label: "Click digital",
            src: "cliente/svg/click_digital.svg",
            price: "00,00",
            value: "digital",
          },
          {
            label: "Click mouse",
            src: "cliente/svg/click_mouse.svg",
            price: "00,00",
            value: "mouse",
          },
        ]}
      />

      <ImageSelect
        onChange={formik.setFieldValue}
        name="trigger"
        value={values.trigger}
        error={formik.errors.trigger}
        label="OPÇÕES DE GATILHOS"
        items={[
          {
            label: "Default",
            src: "cliente/svg/default-trigger-ps5.svg",
            price: "00,00",
            value: "default",
          },
          {
            label: "Stop",
            src: "cliente/svg/pg-trigger-stop-ps5.svg",
            price: "00,00",
            value: "stop",
          },
          {
            label: "Digital",
            src: "cliente/svg/pg-trigger-clickdigital-ps5.svg",
            price: "00,00",
            value: "digital",
          },
          {
            label: "Mouse",
            src: "cliente/svg/pg-trigger-clickmouse-ps5.svg",
            price: "00,00",
            value: "mouse",
          },
        ]}
      />

      <div className="flex max-sm:flex-col sm:w-fit sm:min-w-[494px] sm:items-center">
        <ImageSelect
          onChange={formik.setFieldValue}
          name="grip"
          value={values.grip}
          error={formik.errors.grip}
          label="PINTURA GRIP"
          carouselClassname="min-w-[240px] w-[240px]"
          carouselImageClassname="data-[svg=true]:w-[64px] data-[svg=true]:min-w-[64px] mb-2"
          items={[
            {
              label: "PG Grip",
              strongLabel: "Militar",
              src: "cliente/svg/pg-grip-exclusivo.svg",
              price: "00,00",
              value: "militar",
            },
            {
              label: "PG Grip",
              strongLabel: "Tático",
              src: "cliente/svg/pg-grip-militar.svg",
              price: "00,00",
              value: "tatico",
            },
            {
              label: "PG Grip",
              strongLabel: "Exclusivo",
              src: "cliente/svg/pg-grip-tatico.svg",
              price: "00,00",
              value: "exclusivo",
            },
          ]}
        />
        {/* <hr className="my-2 h-0.5 border-t-0 bg-gray-700 opacity-100 dark:opacity-50 sm:hidden" /> */}
        <div className="flex flex-1 max-sm:hidden">
          <p className="pr-6"></p>
          <div className="inline-block h-[100px] min-h-[1em] w-0.5 self-stretch bg-gray-700 opacity-100 dark:opacity-50"></div>
          <p className="pl-6"></p>
        </div>
        <ImageSelect
          onChange={formik.setFieldValue}
          name="faceplateGrip"
          value={values.faceplateGrip}
          error={formik.errors.faceplateGrip}
          label="Adicionar grip ao faceplate"
          className="max-sm:hidden"
          labelClassname="font-semibold text-base"
          carouselLabelClassname="data-[svg=true]:text-lg font-helveticaNeue"
          carouselImageClassname={
            "data-[svg=true]:w-[80px] data-[svg=true]:min-w-[80px]"
          }
          carouselClassname="data-[svg=true]:min-w-[200px] data-[svg=true]:w-[200px] data-[svg=true]:gap-2"
          items={[
            {
              label: "Com grip",
              src: "cliente/svg/pg_faceplate_com_grip.svg",
              price: "00,00",
              value: "com_grip",
            },
            {
              label: "Sem grip",
              src: "cliente/svg/pg_faceplate_sem_grip.svg",
              price: "00,00",
              value: "sem_grip",
            },
          ]}
        />
      </div>

      <ImageSelect
        onChange={formik.setFieldValue}
        name="faceplateGrip"
        value={values.faceplateGrip}
        error={formik.errors.faceplateGrip}
        label="Adicionar grip ao faceplate"
        className="sm:hidden"
        labelClassname="font-semibold text-base max-sm:uppercase"
        carouselLabelClassname="data-[svg=true]:text-lg font-helveticaNeue"
        carouselImageClassname={
          "data-[svg=true]:w-[80px] data-[svg=true]:min-w-[80px]"
        }
        carouselClassname="data-[svg=true]:min-w-[200px] data-[svg=true]:w-[200px] data-[svg=true]:gap-2"
        items={[
          {
            label: "Com grip",
            src: "cliente/svg/pg_faceplate_com_grip.svg",
            price: "00,00",
            value: "com_grip",
          },
          {
            label: "Sem grip",
            src: "cliente/svg/pg_faceplate_sem_grip.svg",
            price: "00,00",
            value: "sem_grip",
          },
        ]}
      />

      <ImageSelect
        onChange={formik.setFieldValue}
        name="vibration"
        value={values.vibration}
        error={formik.errors.vibration}
        label="MOTORES DE VIBRAÇÃO"
        carouselImageClassname={"data-[svg=true]:w-[90px]"}
        items={[
          {
            src: "cliente/svg/dualsense_com_vibracao.svg",
            label: "Com vibração",
            price: "00,00",
            value: "com_vibracao",
          },
          {
            src: "cliente/svg/dualsense_vibracao_removida.svg",
            label: "Sem vibração",
            price: "00,00",
            value: "sem_vibracao",
          },
        ]}
      />

      <Button type="submit" onClick={formik.handleSubmit}>
        {" "}
        Enviar{" "}
      </Button>
    </div>
  );
}
