import ProdutosPage from "@/components/ProdutosPage";
import { onError } from "@/lib/util/error";
import { fetcher } from "@/lib/util/fetcher";

async function loadData({ searchParams } = {}) {
  const dataMap = new Map();
  const tiposResponse = await fetcher("/api/produtos/tipos");

  if (tiposResponse.error)
    onError(tiposResponse.error, "Erro ao carregar tipos de produtos");

  dataMap.set("tipos", tiposResponse);

  if (searchParams) {
    const searchParamsMap = new URLSearchParams(searchParams);
    if (!searchParamsMap.has("page")) searchParamsMap.set("page", 1);
    if (!searchParamsMap.has("size")) searchParamsMap.set("size", 10);

    const queryString = searchParamsMap.toString();

    const produtosResponse = await fetcher(`/api/produtos?${queryString}`);

    if (produtosResponse.error)
      onError(produtosResponse.error, "Erro ao carregar produtos");

    dataMap.set("produtos", produtosResponse);
  }

  return dataMap;
}

export default async function Page({ searchParams }) {
  const dataMap = await loadData({ searchParams });
  return (
    <section>
      <header>
        <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
          Produtos
        </h2>

        <p className="mt-4 max-w-md text-gray-500">
          Aqui você encontra todos os produtos disponíveis para compra.
        </p>
      </header>

      <ProdutosPage
        tipos={dataMap.has("tipos") ? dataMap.get("tipos") : []}
        produtos={dataMap.has("produtos") ? dataMap.get("produtos") : []}
      />
    </section>
  );
}
