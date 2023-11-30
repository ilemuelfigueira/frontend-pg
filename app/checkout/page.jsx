import { CheckoutComponent } from "@/components/CheckoutPage";
import { serverFetcher } from "@/lib/util/server-fetcher";
import { createServerSupabaseClient } from "@/lib/util/supabase";
import { redirect } from "next/navigation";

async function loadData() {
  const supabase = createServerSupabaseClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/");
  }

  const enderecos = await serverFetcher("/api/enderecos");

  if (enderecos.error) throw new Error(enderecos.error);

  const carrinho = await serverFetcher("/api/carrinhos");

  if (carrinho.error) throw new Error(carrinho.error);

  const pacotes_carrinho = await serverFetcher(
    `/api/carrinhos/${carrinho.cdcarrinho}/pacotes`,
  );

  if (pacotes_carrinho.error) throw new Error(pacotes_carrinho.error);

  carrinho.pacotes = pacotes_carrinho;

  return { enderecos, produtos: pacotes_carrinho };
}

export default async function CheckoutPage() {
  const data = await loadData();
  return (
    <div>
      <CheckoutComponent data={data} />
    </div>
  );
}
