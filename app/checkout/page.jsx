import { CheckoutComponent } from "@/components/CheckoutPage";
import { onError } from "@/lib/util/error";
import { serverFetcher } from "@/lib/util/server-fetcher";
import { readUserOrThrow } from "@/lib/util/supabase";
import { redirect } from "next/navigation";

async function loadData() {
  await readUserOrThrow({
    onOffline: () => redirect("/"),
  });

  const enderecos = await serverFetcher("/api/enderecos");

  if (enderecos.error) onError(enderecos.error, "Erro ao carregar endereços");

  const carrinho = await serverFetcher("/api/carrinhos");

  if (carrinho.error) onError(carrinho.error, "Erro em carregar carrinhos");

  const pacotes_carrinho = await serverFetcher(
    `/api/carrinhos/${carrinho.cdcarrinho}/pacotes`,
  );

  if (pacotes_carrinho.error)
    onError(pacotes_carrinho.error, "Erro ao carregar itens do carrinho");

  carrinho.pacotes = pacotes_carrinho;

  return { enderecos, produtos: pacotes_carrinho, cdcarrinho: carrinho.cdcarrinho };
}

export default async function CheckoutPage() {
  const data = await loadData();
  return (
    <div>
      <CheckoutComponent data={data} />
    </div>
  );
}
