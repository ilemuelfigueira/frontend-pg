import { YupSchemasEnum, getYupSchema } from "@/lib/YupSchemas";
import Product from "@/components/Product";
import { fetcher } from "@/lib/util/fetcher";

// export const metadata = {
//   title: "PG Obsidian, Goliath, Speakeasy PS5",
//   description:
//     "Controle Obsidian, PGCUSTOMSTORE, Obsidian, PGCUSTOM, CONTROLES PG, PG CONTROLES",
//   icons: {
//     icon: "/logo-32x32.png",
//   },
// };

async function loadMetadata(cdproduto) {
  // fetch data
  let produto = await fetcher(`/api/produtos?cdproduto=${cdproduto}`);

  if (!produto?.items.length > 0) throw new Error("Produto não encontrado");

  produto = produto.items[0];

  const subprodutoFotos = await fetcher(
    `/api/produtos/${produto.cdproduto}/sub-produtos/fotos`,
  );

  return {
    produto,
    subprodutoFotos,
  };
}

export async function generateMetadata({ params, searchParams }, parent) {
  // read route params
  const id = params.cdproduto;
  const baseUrl = process.env.NEXT_PUBLIC_DOMAIN;

  if (!id)
    return {
      title: "Produto não encontrado",
      description: "Essa Página não existe",
    };

  const { produto, subprodutoFotos } = await loadMetadata(id);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: produto.nmproduto,
    description: produto.deproduto,
    keywords: [
      "Controles Exclusivos",
      "Controles Exclusivos da PG",
      "Controles Exclusivos PG",
      "Obsidian",
      "PG Obsidian",
      "PG Obsidian PS5",
      "Obsidian PS5",
      "Controles Customizados",
      "Controles Customizados da PG",
      "Controles Customizados PG",
      "Controles PG",
    ],
    image: subprodutoFotos[0]?.nmpath,
    name: produto.nmproduto,
    url: `${baseUrl}/exclusivos/${id}`,
    model: "PG Obsidian PS5",
    product: `${produto.nmpath}`,
    category: [
      produto.nmprodutotipo || "",
      "PADDLE",
      "PADDLE_CLICK",
      "GRIPS",
      "VIBRATIONS",
      "FACEPLATE",
      "FACEPLATE_GRIP",
    ],
    color: ["white", "black", "red", "blue", "green", "yellow", "purple"],
    brand: "PG Custom Store",
    keywords: [
      "Controles Exclusivos",
      "Controles Exclusivos da PG",
      "Controles Exclusivos PG",
      "Obsidian",
      "PG Obsidian",
      "PG Obsidian PS5",
      "Obsidian PS5",
      "Controles Customizados",
      "Controles Customizados da PG",
    ],
    alternates: {
      canonical: `${baseUrl}/exclusivos/${id}`,
    },
    openGraph: {
      images: [subprodutoFotos.map((foto) => foto.nmpath), ...previousImages],
    },
  };
}

async function getProduto(cdproduto) {
  const res = await fetcher(`/api/produtos?cdproduto=${cdproduto}`);

  const produto = res.items[0];

  return produto;
}

async function getSubProdutos(cdproduto) {
  const res = await fetcher(`/api/produtos/${cdproduto}/sub-produtos`);

  return res;
}

async function getSubProdutosFotos(cdproduto) {
  const res = await fetcher(`/api/produtos/${cdproduto}/sub-produtos/fotos`);

  return res;
}

async function getSubProdutosPrecos(cdproduto) {
  const res = await fetcher(`/api/produtos/${cdproduto}/sub-produtos/precos`);

  return res;
}

async function loadData({ params }) {
  const produto = await getProduto(params.cdproduto);

  if(produto.error) throw new Error(produto.error);

  if (!produto) throw new Error("Produto não encontrado");

  const subprodutos = await getSubProdutos(produto.cdproduto);
  const subprodutosFotos = await getSubProdutosFotos(produto.cdproduto);
  const subprodutosPrecos = await getSubProdutosPrecos(produto.cdproduto);

  if (subprodutos.error) throw new Error(subprodutos.error);
  if (subprodutosFotos.error) throw new Error(subprodutosFotos.error);
  if (subprodutosPrecos.error) throw new Error(subprodutosPrecos.error);

  const result = {
    produto,
    subprodutos,
    subprodutosFotos,
    subprodutosPrecos,
  };

  return result;
}

export default async function ControleExclusivo({ params, ...props }) {
  const { produto, subprodutos, subprodutosFotos, subprodutosPrecos } =
    await loadData({ params });

  const yupSchema = getYupSchema(params.nmproduto);

  return (
    <>
      <Product
        whatsappLoja={process.env.WHATSAPP_LOJA}
        produto={produto}
        subprodutos={subprodutos}
        subprodutosFotos={subprodutosFotos}
        subprodutosPrecos={subprodutosPrecos}
        description={produto?.deproduto}
        title={produto?.nmproduto}
        validationSchema={yupSchema}
      />
    </>
  );
}
