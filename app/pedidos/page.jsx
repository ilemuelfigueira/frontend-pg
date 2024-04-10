import { aplicarMascara } from "@/lib/util";
import { onError } from "@/lib/util/error";
import { serverFetcher } from "@/lib/util/server-fetcher";
import { redirect } from "next/navigation";
import { Clipboard } from "./components/Clipboard";
import { StatusBadge } from "./components/StatusBadge";
import If from "@/components/If";
import { readUserOrThrow } from "@/lib/util/supabase";

async function loadData(props) {
  await readUserOrThrow({
    onOffline: () => redirect("/"),
  });

  const pedidos = await serverFetcher("/api/pedidos");

  if (pedidos.error) onError(pedidos.error, "Erro ao carregar pedidos");

  if (pedidos.length == 0) onError("Nenhum pedido encontrado");

  return pedidos;
}

export default async function Pedidos({ params }) {
  const pedidos = await loadData({ params });

  return (
    <div className="mx-auto my-0">
      <span className="flex items-center gap-2 text-center text-base font-bold text-slate-800 md:text-2xl">
        <i className="pi pi-ticket"></i>
        {" PEDIDOS"}
      </span>
      <ul className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 overflow-hidden">
        {pedidos.map((pedido) => (
          <li
            className="flex w-[400px] flex-col items-start justify-start gap-2 overflow-hidden rounded-sm bg-white p-4 shadow-sm"
            key={pedido.cdpedido}
          >
            <StatusBadge status={pedido.status} />
            <header className="flex w-full items-center justify-between gap-2">
              <span className="text-base font-light">Código: </span>
              <span className="m-0 overflow-hidden truncate overflow-ellipsis whitespace-nowrap p-0 text-sm font-semibold">
                {pedido.cdpedido}
              </span>
              <Clipboard text={pedido.cdpedido} />
            </header>
            <div>
              <span className="text-base font-light">Valor: </span>
              <span className="text-green-600">
                {aplicarMascara(pedido.value, "real")}
              </span>
            </div>
            <If condition={pedido.status == "PENDING"}>
              <a
                className="w-full rounded-sm bg-blue-500 p-2 text-center text-white"
                href={pedido.payment_url}
                target="_blank"
              >
                PAGAR
              </a>
            </If>
          </li>
        ))}
      </ul>
    </div>
  );
}
