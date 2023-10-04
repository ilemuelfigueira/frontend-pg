"use client";

import ImageSelect from "@/components/ImageSelect";
import { useProductForm } from "./index.hook";
import { Button } from "primereact/button";

export default function Form({ ...props }) {
  const { formik, getLabel, sendFormToWhatsapp } = useProductForm({
    WHATSAPP_LOJA: props.whatsappLoja,
  });

  const { values } = formik;

  const { title, shapes } = props;

  return (
    <div className="flex w-full max-lg:flex-col max-lg:items-center max-lg:gap-4 lg:items-start lg:justify-center lg:gap-4">
      <div className="#banners m-0 flex h-fit w-full min-w-[380px] max-w-[1000px] flex-wrap justify-evenly gap-3 p-0 max-lg:hidden">
        <img
          className="aspect-square w-[48%] flex-[0,0,48%] rounded-xl shadow-md duration-300 hover:shadow-xl"
          src="cliente/png/ps5/azul_claro.png"
          alt=""
        />
        <img
          className="aspect-square w-[48%] flex-[0,0,48%] rounded-xl shadow-md duration-300 hover:shadow-xl"
          src="cliente/png/ps5/azul_metalico.png"
          alt=""
        />
        <img
          className="aspect-square w-[48%] flex-[0,0,48%] rounded-xl shadow-md duration-300 hover:shadow-xl"
          src="cliente/png/ps5/cereja.png"
          alt=""
        />
        <img
          className="aspect-square w-[48%] flex-[0,0,48%] rounded-xl shadow-md duration-300 hover:shadow-xl"
          src="cliente/png/ps5/camuflado.png"
          alt=""
        />
        {/* <video
          className="aspect-square w-[48%] flex-[0,0,48%] rounded-xl shadow-md duration-300 hover:shadow-xl"
          loop={true}
          controls={true}
          muted={true}
          playsInline={true}
          autoPlay={true}
          preload="metadata"
          src="reflex-pro-apresentacao.mp4"
        ></video> */}
      </div>
      <div className="#personalizacao flex flex-col items-start justify-start gap-4 rounded-xl px-4 max-lg:w-full lg:min-w-[520px] lg:max-w-[560px] lg:bg-gray-200 lg:shadow-lg xl:max-w-[660px]">
        <div className="#header flex w-full flex-col items-start whitespace-nowrap tracking-tighter">
          <h2 className="text-3xl font-black">{title}</h2>
          <span className="text-base font-semibold tracking-wide">
            a partir de <strong className="text-green-400">R$ 399,99</strong>
          </span>
        </div>

        <div className="flex snap-x snap-mandatory self-center overflow-x-auto scroll-smooth sm:w-[100%] md:w-[80%] lg:hidden">
          <img
            className="aspect-square w-full snap-center"
            src="cliente/png/ps5/azul_claro.png"
            alt=""
          />
          <img
            className="aspect-square w-full snap-center"
            src="cliente/png/ps5/azul_metalico.png"
            alt=""
          />
          <img
            className="aspect-square w-[48%] flex-[0,0,48%] rounded-xl shadow-md duration-300 hover:shadow-xl"
            src="cliente/png/ps5/cereja.png"
            alt=""
          />
          <img
            className="aspect-square w-[48%] flex-[0,0,48%] rounded-xl shadow-md duration-300 hover:shadow-xl"
            src="cliente/png/ps5/camuflado.png"
            alt=""
          />
          {/* <video
            className="aspect-square w-full snap-center"
            loop={true}
            controls={true}
            muted={true}
            playsInline={true}
            autoPlay={true}
            preload="metadata"
            src="reflex-pro-apresentacao.mp4"
          ></video> */}
        </div>

        <ImageSelect
          onChange={formik.setFieldValue}
          name="shape"
          value={values.shape}
          noItemLabel
          error={formik.errors.shape}
          items={shapes}
        />

        <div className="#description flex w-full flex-col items-start gap-3">
          <span className="#modelName w-full font-helveticaNeue font-semibold">
            {getLabel(shapes, formik.values.shape)}
          </span>
          <p className="w-full font-helvetica text-sm font-light leading-6 tracking-[0.0125em]">
            {formik.values.shape
              ? `Apresentamos o Controle Obsidian da PG Custom, uma obra-prima de engenharia e design que redefine os padrões da experiência de jogos. 
              Este controle customizável é uma verdadeira expressão de tecnologia avançada e ergonomia, cuidadosamente projetado para proporcionar desempenho superior e conforto incomparável a cada jogador. 
              O Controle Obsidian não é apenas um dispositivo, é uma extensão do seu estilo de jogo, oferecendo uma gama de recursos personalizáveis para atender às suas necessidades específicas.`
              : ""}
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
          <div className="flex max-sm:hidden">
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

        <Button
          className="gap-4 border-green-400 bg-green-500 focus:border-green-500 focus:bg-green-600"
          type="submit"
          onClick={sendFormToWhatsapp}
        >
          <span className="font-semibold tracking-wider">Enviar</span>
          <span className="pi pi-whatsapp"></span>
        </Button>
      </div>
    </div>
  );
}
