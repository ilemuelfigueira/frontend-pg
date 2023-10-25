import { YupSchemasEnum } from "@/lib/YupSchemas";
import Product from "@/components/Product";
import goliathData from '@/public/json/goliath.json'

export const metadata = {
  title: "Goliath",
  description: "Controle Goliath",
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
          shape: goliathData.shapes[0].value
        }}
        description={goliathData.description}
        faceplateGrips={goliathData.faceplateGrips}
        vibrations={goliathData.vibrations}
        grips={goliathData.grips}
        triggers={goliathData.triggers}
        paddles={goliathData.paddles}
        paddlesClicks={goliathData.paddlesClicks}
        paddlesColors={goliathData.paddlesColors}
        banners={goliathData.banners}
        title={goliathData.title}
        validationSchema={YupSchemasEnum.goliath}
        shapes={goliathData.shapes}
      />
    </>
  );
}
