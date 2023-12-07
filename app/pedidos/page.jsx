import { serverFetcher } from "@/lib/util/server-fetcher";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";

async function loadData() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/");
  }

  const pedidos = await serverFetcher("/api/pedidos");

  if (pedidos.error) throw new Error(pedidos.error);

  if(pedidos.length == 0) throw new Error("Nenhum pedido encontrado");

  return pedidos;
}

export default async function Pedidos() {

  const pedidos = await loadData();

  return (
    <div className="mx-auto my-0 w-[95%]">
      Pedidos

      {pedidos.map(pedido => (
        <span key={pedido.cdpedido}>
          {pedido.cdpedido}
          {JSON.stringify(pedido)}
        </span>
      ))}
    </div>
  )
}