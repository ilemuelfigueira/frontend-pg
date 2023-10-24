import { YupSchemasEnum } from "@/lib/YupSchemas";
import Product from "@/components/Product";
import controleData from '@/public/json/grandmaster.json'

export const metadata = {
  title: "Grandmaster",
  description: "Controle Grandmaster",
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
          shape: controleData.shapes[0].value
        }}
        description={controleData.description}
        vibrations={controleData.vibrations}
        grips={controleData.grips}
        triggers={controleData.triggers}
        paddles={controleData.paddles}
        paddlesClicks={controleData.paddlesClicks}
        paddlesColors={controleData.paddlesColors}
        banners={controleData.banners}
        title={controleData.title}
        validationSchema={YupSchemasEnum.GRANDMASTER}
        shapes={controleData.shapes}
      />
    </>
  );
}
