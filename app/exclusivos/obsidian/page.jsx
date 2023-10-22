import { YupSchemasEnum } from "@/lib/YupSchemas";
import Product from "@/components/Product";
import obsidianData from '@/public/json/obsidian.json'

export const metadata = {
  title: "Obsidian",
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
        defaultValues={{
          shape: obsidianData.shapes[0].value
        }}
        description={obsidianData.description}
        faceplateGrips={obsidianData.faceplateGrips}
        vibrations={obsidianData.vibrations}
        grips={obsidianData.grips}
        triggers={obsidianData.triggers}
        paddles={obsidianData.paddles}
        paddlesClicks={obsidianData.paddlesClicks}
        paddlesColors={obsidianData.paddlesColors}
        banners={obsidianData.banners}
        title={obsidianData.title}
        validationSchema={YupSchemasEnum.OBSIDIAN}
        shapes={obsidianData.shapes}
      />
    </>
  );
}
