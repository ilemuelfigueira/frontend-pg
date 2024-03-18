import If from "@/components/If";
import { Pacotes } from "@/components/Pacotes";
import { ResumoCarrinho } from "@/components/ResumoCarrinho";
import { onError } from "@/lib/util/error";
import { serverFetcher } from "@/lib/util/server-fetcher";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function loadData() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/");
  }

  const carrinho = await serverFetcher("/api/carrinhos");

  const dataMap = new Map();

  if (carrinho.error) {
    console.error(carrinho.error)
    return dataMap;
    // onError(carrinho.error, "Erro ao carregar carrinho");
  }

  dataMap.set("carrinho", carrinho);

  const pacotes_carrinho = await serverFetcher(
    `/api/carrinhos/${carrinho.cdcarrinho}/pacotes`,
  );

  if (pacotes_carrinho.error)
    onError(pacotes_carrinho.error, "Erro ao carregar items do carrinho");

  dataMap.set("pacotes", pacotes_carrinho);

  console.log(JSON.stringify(pacotes_carrinho))

  carrinho.pacotes = pacotes_carrinho;

  return dataMap;
}

export default async function Carrinho() {
  const dataMap = await loadData();

  const carrinho = dataMap.get("carrinho") || null;

  const pacotes = dataMap.get("pacotes") || [];

  const somapacotes = pacotes.reduce(
    (acc, pacote) => acc + Number(pacote.vlpacote),
    0,
  );

  return (
    <div className="flex w-full max-w-full flex-col gap-8">
      <div className="flex w-full max-w-full justify-between border-b border-slate-600 px-4">
        <span className="text-base font-bold text-slate-800 md:text-2xl">
          <i className="pi pi-shopping-bag"></i> PRODUTO E SERVIÇO
        </span>
        <span
          data-situacao={carrinho?.sgcarrinhosituacao}
          className="text-base font-bold data-[situacao='PEN']:text-yellow-400 md:text-2xl"
        >
          {carrinho?.carrinho_situacao?.nmcarrinhosituacao}
        </span>
      </div>
      <Pacotes pacotes={pacotes} />
      {JSON.stringify(dataMap.get("carrinho"))}
      <If condition={!carrinho} fallback={"Carrinho Vazio"}>
        <ResumoCarrinho
          cdcarrinho={carrinho?.cdcarrinho}
          carrinhoVazio={pacotes.length == 0}
          somapacotes={somapacotes}
        />
      </If>
    </div>
  );
}
