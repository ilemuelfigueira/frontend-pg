import { IlustracoesHomePage } from "@/components/IlustracoesHomePage";
import { onError } from "@/lib/util/error";
import { fetcher } from "@/lib/util/fetcher";
import Link from "next/link";

async function loadData() {
  const dataMap = new Map();

  const produtosExclusivos = await fetcher(
    "/api/produtos?nmprodutotipo=CONTROLE_EXCLUSIVO",
  );

  if (produtosExclusivos.error)
    onError(
      produtosExclusivos.error,
      "Erro ao carregar produtos exclusivos das ilustrações",
    );

  dataMap.set("produtosExclusivos", produtosExclusivos);

  return dataMap;
}

export default async function Home() {
  const dataMap = await loadData();

  return (
    <main className="flex w-full flex-col items-center justify-start gap-20 p-2">
      <header className="flex flex-col items-center justify-center">
        <span className="text-center text-2xl font-bold tracking-wide text-slate-800 md:text-3xl">
          Evolua o nível da sua jogatina.
        </span>
        <span className="text-center text-lg font-medium tracking-tighter text-slate-500 md:text-2xl">
          Não deixe a sua gameplay ser limitada por um controle comum.
        </span>
      </header>
      <IlustracoesHomePage />
      <section className="w-full">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch">
            <div className="grid place-content-center rounded bg-gray-100 p-6 sm:p-8">
              <div className="mx-auto max-w-md text-center lg:text-left">
                <header>
                  <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
                    Configure o seu!
                  </h2>

                  <p className="mt-4 text-gray-500">
                    Separamos alguns modelos exclusivos para você escolher, e
                    também é possível personalizar o seu controle.
                  </p>
                </header>
              </div>
            </div>

            <div className="lg:col-span-2 lg:py-8">
              <ul className="grid grid-cols-2 gap-4">
                {dataMap.has("produtosExclusivos") ? (
                  dataMap.get("produtosExclusivos")?.items?.map((produto) => (
                    <li
                      style={{
                        flex: "0 0 200px",
                      }}
                      key={produto.cdproduto}
                    >
                      <Link
                        href={`/produtos?cdproduto=${produto.cdproduto}`}
                        className="group block"
                      >
                        <img
                          src={
                            produto.produto_foto[0]?.nmpath || "/no-photo.png"
                          }
                          alt=""
                          className="aspect-square w-full rounded object-cover"
                        />

                        <div className="mt-3">
                          <h3 className="font-medium text-gray-900 group-hover:underline group-hover:underline-offset-4">
                            {produto.nmproduto}
                          </h3>
                        </div>
                      </Link>
                    </li>
                  ))
                ) : (
                  <span>
                    Não foi possível encontrar os produtos exclusivos...
                  </span>
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
