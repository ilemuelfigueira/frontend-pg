import { Pacotes } from "@/components/Pacotes";
import { ResumoCarrinho } from "@/components/ResumoCarrinho";
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

export default async function Carrinho() {
  const carrinho = await loadData();

  const somapacotes = carrinho.pacotes.reduce(
    (acc, pacote) => acc + Number(pacote.vlpacote),
    0,
  );

  return (
    <div className="flex w-full max-w-full flex-col gap-8">
      <div className="flex w-full max-w-full justify-between border-b border-slate-600 px-4">
        <span className="text-base md:text-2xl font-bold text-slate-800">
          <i className="pi pi-shopping-bag"></i> PRODUTO E SERVIÇO
        </span>
        <span
          data-situacao={carrinho.sgcarrinhosituacao}
          className="text-base md:text-2xl font-bold data-[situacao='PEN']:text-yellow-400"
        >
          {carrinho.carrinho_situacao.nmcarrinhosituacao}
        </span>
      </div>
      <Pacotes pacotes={carrinho.pacotes} />
      <ResumoCarrinho somapacotes={somapacotes} />

    </div>
  );
}
