import { aplicarMascara } from "@/lib/util";
import { onError } from "@/lib/util/error";
import { serverFetcher } from "@/lib/util/server-fetcher";
import { redirect } from "next/navigation";
import { Clipboard } from "./components/Clipboard";
import If from "@/components/If";
import { readUserOrThrow } from "@/lib/util/supabase";
import moment from "moment";
import { AlertNotification } from "./components/AlertNotification";
import { PedidoStatusEnum, PaymentStatusTranslate } from "./enums";
import { UpdateTrackingStatus } from "./components/admin/UpdateTrackingStatus";
import { UpdateProductionStatus } from "./components/admin/UpdateProductionStatus";
import { DialogFilter } from "./components/DialogFilter";
import { DrawerFilter } from "./components/DrawerFilter";
import { PaginationPedidos } from "./components/Pagination";
import { PaymentInfo } from "./components/PaymentInfo";

async function loadData(props) {
  const map = new Map();
  await readUserOrThrow({
    onOffline: () => redirect("/"),
    onSuccess: ({ user }) => {
      map.set("user", user);
      map.set("expired_login", "N");
    },
    onExpired: () => {
      map.set("expired_login", "S");
      map.set("user", null);
    },
  });

  const user = map.get("user");

  if (!user) redirect("/");

  const userMetadata = user.user_metadata;

  const querystring = new URLSearchParams(props?.searchParams ?? {}).toString();

  const pedidos = await serverFetcher("/api/pedidos?" + querystring);

  if (pedidos.error) onError(pedidos.error, "Erro ao carregar pedidos");

  if (pedidos.length == 0) onError("Nenhum pedido encontrado");

  return {
    pedidos,
    userMetadata,
  };
}

export default async function Pedidos({ params, searchParams }) {
  const { pedidos, userMetadata } = await loadData({ params, searchParams });

  const isAdmin = userMetadata.role === "admin";

  return (
    <div className="w-full">
      <span className="mb-8 flex items-center gap-2 text-center text-base font-bold text-slate-800 md:text-2xl">
        <i className="pi pi-ticket"></i>
        {" PEDIDOS"}
      </span>
      <div className="flex w-full items-center justify-end gap-4">
        <div className="md:hidden">
          <DrawerFilter searchParams={searchParams} />
        </div>
        <div className="max-md:hidden">
          <DialogFilter searchParams={searchParams} />
        </div>
      </div>
      <ul className="mt-4 grid w-full grid-cols-1 gap-4">
        {pedidos.map((pedido) => (
          <li
            key={pedido.cdpedido}
            className="flex flex-col items-start justify-start gap-4 rounded-lg bg-gray-300 p-4"
          >
            <header className="flex w-full justify-between">
              <div className="flex flex-col items-start justify-start gap-[2px]">
                <span className="font-medium">Código do pedido</span>
                <span className="font-light">
                  {pedido.cdpedido} {"  "}
                  <Clipboard label="Código do pedido" text={pedido.cdpedido} />
                </span>
              </div>

              <div className="flex flex-col items-end justify-start gap-[2px]">
                <span className="font-medium">Pedido feito em</span>
                <span className="font-light">
                  {pedido.created_at &&
                    moment(pedido.created_at).format("DD/MMMM")}
                </span>
              </div>
            </header>
            <div className="flex w-full flex-col items-start justify-start gap-1 rounded-lg bg-white p-4">
              <ul className="grid w-full grid-cols-1 gap-2">
                {pedido?.items?.map((produto, produtoi) => (
                  <li
                    key={produto?.id}
                    data-isfirst={produtoi == 0}
                    data-islast={produtoi == pedido?.items?.length - 1}
                    className="flex w-full items-center justify-start gap-4 border border-transparent data-[isFirst=false]:border-t-slate-400 data-[islast=true]:border-b-slate-400"
                  >
                    <img
                      className="aspect-square w-20 bg-center"
                      src={produto?.picture_url}
                    />

                    <div className="grid grid-cols-1 gap-[2px] text-xs">
                      <span className="whitespace-pre-line">
                        {produto.title}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Valor (unidade):</span>
                        <span>
                          R${aplicarMascara(produto.unit_price, "real")}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Quantidade:</span>
                        <span>{produto.quantity}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div>
                <span className="text-base font-light">Total: </span>
                <span className="text-green-600">
                  R$ {aplicarMascara(pedido.value, "real")}
                </span>
              </div>
            </div>

            <PaymentInfo external_reference={pedido?.cdcarrinho} />

            <div className="flex w-full items-center justify-center bg-white p-4">
              <span className="text-base font-medium md:text-xl">
                Informações adicionais.
              </span>
            </div>

            {isAdmin ? (
              <AlertNotification
                title={`${pedido?.nome} - ${pedido?.email}`}
                description={pedido?.telefone}
              />
            ) : (
              ""
            )}

            <AlertNotification
              icon="money"
              title="STATUS PAGAMENTO"
              description={PaymentStatusTranslate[pedido.status]}
            />

            <AlertNotification
              data-ispaid={pedido.status === PedidoStatusEnum.PAID}
              data-isadmin={isAdmin}
              className="data-[ispaid=false]:hidden"
              icon="wrench"
              title="STATUS PRODUÇÃO"
              description={
                pedido.status === "PAID"
                  ? pedido.production_status
                  : "AGUARDANDO PAGAMENTO"
              }
              action={
                <UpdateProductionStatus
                  disabled={!isAdmin}
                  cdpedido={pedido.cdpedido}
                  production_status={pedido.production_status}
                >
                  <button className="outline-none">
                    <i className="ph ph-gear text-2xl"></i>
                  </button>
                </UpdateProductionStatus>
              }
            />

            <AlertNotification
              data-isadmin={isAdmin}
              data-ispaid={pedido.status === PedidoStatusEnum.PAID}
              className="data-[ispaid=false]:hidden"
              icon="paper-plane"
              title="STATUS ENVIO"
              description={
                pedido.status === "PAID"
                  ? pedido.tracking_status
                  : "AGUARDANDO PAGAMENTO"
              }
              subdescription={pedido.tracking_code}
              action={
                <UpdateTrackingStatus
                  disabled={!isAdmin}
                  cdpedido={pedido.cdpedido}
                  tracking_status={pedido.tracking_status}
                  tracking_code={pedido.tracking_code}
                >
                  <button className="outline-none">
                    <i className="ph ph-gear text-2xl"></i>
                  </button>
                </UpdateTrackingStatus>
              }
            />

            <If condition={pedido.status == "PENDING"}>
              <a
                className="hidden w-full rounded-sm bg-blue-500 p-2 text-center text-white"
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
