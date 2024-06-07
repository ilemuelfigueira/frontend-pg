import { onError } from "@/lib/util/error";
import { serverFetcher } from "@/lib/util/server-fetcher";
import { Comercial } from "./comercial";
import { Ilustracoes } from "./ilustracoes";
import { readUserOrThrow } from "@/lib/util/supabase";

// const defaultMetadata = {
//   title: "PG CUSTOM",
//   description: "Loja de venda e personalização de controles de videogame",
//   images: [thumbnail],
// };

// export const metadata = {
//   ...defaultMetadata,
//   twitter: {
//     ...defaultMetadata,
//     card: "summary_large_image",
//     site: "@pgcustomstore",
//     creator: "@pgcustomstore",
//   },
//   openGraph: {
//     ...defaultMetadata,
//     type: "website",
//     url: process.env.NEXT_PUBLIC_DOMAIN,
//     siteName: "PG CUSTOM",
//   },
// };

export async function generateMetadata({ params }, parent) {
  const id = params.cdproduto;

  const produtoResponse = await serverFetcher(`/api/produtos/${id}`);

  if (produtoResponse.error)
    return {
      title: "Produto não encontrado",
      openGraph: {
        title: "Produto não encontrado",
        images: ["/no-photo.png"],
      },
    };

  const defaultMetadata = {
    title: `${produtoResponse.nmproduto} | PG CUSTOM`,
    description: produtoResponse.deproduto,
    images: getAllImagesSrcFromDataMap(produtoResponse?.banners),
  };

  const meta = {
    ...defaultMetadata,
    twitter: {
      ...defaultMetadata,
      card: "summary_large_image",
      site: "@pgcustomstore",
      creator: "@pgcustomstore",
    },
    openGraph: {
      ...defaultMetadata,
      type: "website",
      url: `${process.env.NEXT_PUBLIC_DOMAIN}/produto/${id}`,
      siteName: "PG CUSTOM",
    },
  };

  return meta
}

async function loadData({ cdproduto = "" }) {
  const dataMap = new Map();

  await readUserOrThrow({
    onSuccess: ({ user }) => {
      dataMap.set("user", user);
      dataMap.set("expired_login", "N");
    },
    onExpired: () => {
      dataMap.set("expired_login", "S");
      dataMap.set("user", null);
    },
  });

  const produtoResponse = await serverFetcher(`/api/produtos/${cdproduto}`);

  if (produtoResponse.error)
    onError(produtoResponse.error, "Erro ao carregar informações do produto");

  dataMap.set("produto", produtoResponse);

  const subProdutoResponse = await serverFetcher(
    `/api/produtos/${cdproduto}/sub-produtos`,
  );

  if (subProdutoResponse.error)
    onError(
      subProdutoResponse.error,
      "Erro ao carregar informações dos subprodutos",
    );

  dataMap.set("subProdutos", subProdutoResponse);
  dataMap.set("cdproduto", cdproduto);

  return dataMap;
}

export default async function ProdutoPage({ params }) {
  const dataMap = await loadData({ cdproduto: params.cdproduto });
  return (
    <section className="mt-10 grid grid-cols-1 items-start gap-8 max-md:justify-items-center md:grid-cols-2">
      <section className="w-full max-md:max-w-[500px]">
        <Ilustracoes imagens={getAllImagesSrcFromDataMap(dataMap.get('produto')?.banners)} />
      </section>
      <Comercial dataMap={dataMap} />
    </section>
  );
}

function getAllImagesSrcFromDataMap(banners = []) {
  if (banners.length === 0) return ["/no-photo.png"];

  return banners.map((banner) =>
      banner.replace(process.env.NEXT_PUBLIC_STORAGE_PUBLIC, ""),
    )
    .map((banner) => `${process.env.NEXT_PUBLIC_STORAGE_PUBLIC}${banner}`);
}
