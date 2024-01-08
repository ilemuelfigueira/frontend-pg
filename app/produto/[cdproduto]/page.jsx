import { onError } from "@/lib/util/error";
import { serverFetcher } from "@/lib/util/server-fetcher";
import { Comercial } from "./comercial";
import { Ilustracoes } from "./ilustracoes";
import { aplicarMascara } from "@/lib/util";

async function loadData({ cdproduto = "" }) {
  const dataMap = new Map();

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
  if (!dataMap.has("produto") || !dataMap.has("subProdutos"))
    return ["/no-photo.png"];

  return [].concat(
    dataMap.get("produto").produto_foto.map((item) => item.nmpath),
    dataMap.get("subProdutos").map((item) => item.sub_produto_foto[0]?.nmpath),
  );
}
