import { YupSchemasEnum } from "@/Util/YupSchemas";
import Product from "@/components/Product";

export const metadata = {
  title: "PG CUSTOM - Obsidian",
  description: "Controle Obsidian",
  icons: {
    icon: "/logo-32x32.png",
  },
};

export default function ControleVariavel() {
  return (
    <>
      <Product
        whatsappLoja={process.env.WHATSAPP_LOJA}
        title="PG OBSIDIAN PS5"
        validationSchema={YupSchemasEnum.OBSIDIAN}
        shapes={[
          {
            src: "cliente/png/ps5/branco.png",
            price: "00,00",
            label: "Branco",
            value: "branco",
          },
          {
            src: "cliente/png/ps5/prata_metalico.png",
            price: "00,00",
            label: "Prata",
            value: "prata",
          },
          {
            src: "cliente/png/ps5/preto.png",
            price: "00,00",
            label: "Preto",
            value: "preto",
          },
          {
            src: "cliente/png/ps5/red_metalico.png",
            price: "00,00",
            label: "Vermelho Metálico",
            value: "vermelho_metalico",
          },
          {
            src: "cliente/png/ps5/azul_metalico.png",
            price: "00,00",
            label: "Azul Metálico",
            value: "azul_metalico",
          },
          {
            src: "cliente/png/ps5/roxo.png",
            price: "00,00",
            label: "Roxo",
            value: "roxo",
          },
          {
            src: "cliente/png/ps5/rosa.png",
            price: "00,00",
            label: "Rosa",
            value: "rosa",
          },
          {
            src: "cliente/png/ps5/azul_claro.png",
            price: "00,00",
            label: "Azul Claro",
            value: "azul_claro",
          },
          {
            src: "cliente/png/ps5/cereja.png",
            price: "00,00",
            label: "Cereja",
            value: "cereja",
          },
          {
            src: "cliente/png/ps5/camuflado.png",
            price: "00,00",
            label: "Camuflado",
            value: "camuflado",
          },
        ]}
      />
    </>
  );
}
