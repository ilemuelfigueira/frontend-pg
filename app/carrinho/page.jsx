import { Pacotes } from "@/components/Pacotes";
import { floatToBRL } from "@/lib/util/intl";
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

  if (carrinho.error) throw new Error(carrinho.error);

  const pacotes_carrinho = await serverFetcher(
    `/api/carrinhos/${carrinho.cdcarrinho}/pacotes`,
  );

  if (pacotes_carrinho.error) throw new Error(pacotes_carrinho.error);

  carrinho.pacotes = pacotes_carrinho;

  return carrinho;
}

function Resumo({ somapacotes }) {
  return (
    <div className="fixed bottom-0 left-1/2 flex w-screen max-w-full -translate-x-1/2 justify-between rounded-md bg-white p-4">
      <span className="text-2xl font-bold text-slate-700">RESUMO:</span>
      <span className="text-2xl font-bold text-slate-700">
        {floatToBRL(parseFloat(somapacotes))}
      </span>
    </div>
  );
}

export default async function Carrinho() {
  const carrinho = await loadData();

  const somapacotes = carrinho.pacotes.reduce(
    (acc, pacote) => acc + Number(pacote.vlpacote),
    0,
  );

  return (
    <div className="flex w-full max-w-full flex-col gap-8">
      <div className="flex w-full max-w-full justify-between border-b border-slate-600">
        <span className="text-2xl font-bold text-slate-800">
          <i className="pi pi-shopping-bag"></i> PRODUTO E SERVIÇO
        </span>
        <span
          data-situacao={carrinho.sgcarrinhosituacao}
          className="text-2xl font-bold data-[situacao='PEN']:text-yellow-400"
        >
          {carrinho.carrinho_situacao.nmcarrinhosituacao}
        </span>
      </div>
      <Pacotes pacotes={carrinho.pacotes} />
      <Resumo somapacotes={somapacotes} />
    </div>
  );
}
