import { onError } from "@/lib/util/error";
import { serverFetcher } from "@/lib/util/server-fetcher";
import { Comercial } from "./comercial";
import { Ilustracoes } from "./ilustracoes";
import { readUserOrThrow } from "@/lib/util/supabase";

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
        <Ilustracoes imagens={getAllImagesSrcFromDataMap(dataMap)} />
      </section>
      <Comercial dataMap={dataMap} />
    </section>
  );
}

function getAllImagesSrcFromDataMap(dataMap = new Map()) {
  if (!dataMap.get("produto")?.banners) return ["/no-photo.png"];

  return dataMap
    .get("produto")
    ?.banners.map((banner) =>
      banner.replace(process.env.NEXT_PUBLIC_STORAGE_PUBLIC, ""),
    )
    .map((banner) => `${process.env.NEXT_PUBLIC_STORAGE_PUBLIC}${banner}`);
}
