"use server";

import { aplicarMascara } from "@/lib/util";
import { serverFetcher } from "@/lib/util/server-fetcher";
import { readUserOrThrow } from "@/lib/util/supabase";
import { redirect } from "next/navigation";
import {
  PaymentFlag,
  PaymentMethod,
  PaymentStatus,
  StatusDetail,
} from "../enums";

export async function loadData(external_reference) {
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

  const pagamentos = await serverFetcher(
    `/api/payments/${external_reference}/status`,
  );

  if (pagamentos.error)
    return {
      error: pagamentos.error,
    };

  map.set("pagamentos", pagamentos);

  return {
    data: map,
  };
}

export async function PaymentInfo({ external_reference }) {
  const { data, error } = await loadData(external_reference);
  if (error || data.get("pagamentos")?.length === 0) return undefined;

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-center bg-white p-4">
        <span className="text-base font-medium md:text-xl">
          Informações de pagamento.
        </span>
      </div>
      <ul className="flex w-full flex-col items-center gap-4 pt-4">
        {data.get("pagamentos")?.map((payment) => (
          <li
            key={payment.id}
            className="w-full rounded-md border bg-white p-4 shadow-sm md:flex md:flex-wrap md:gap-4"
          >
            <div className="mb-2 w-full">
              <strong>ID:</strong> {payment.id} <br />
              <strong>Status:</strong> {getTranslatedStatus(payment.status)}
              <br />
              <strong>Valor: </strong>
              {aplicarMascara(payment.transaction_amount, "real")}
            </div>
            <div className="mb-2 w-full">
              <strong>Email do Comprador:</strong> {payment.payer.email} <br />
              <strong>Data de Criação: </strong>
              {new Date(payment.date_created).toLocaleString()}
            </div>
            <div className="flex flex-col items-start justify-start gap-1">
              <div className="flex w-full items-center gap-1">
                <strong>Método de Pagamento: </strong>
                {getTranslatedMethod(payment.payment_type_id)}
                <GetTranslatedCardFlag flag={payment.payment_method_id} />
              </div>
              <div className="flex w-full items-center gap-1">
                <strong>Detalhes do Status: </strong>
                {getTranslatedDetail(payment.status_detail)}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const getTranslatedStatus = (status) => PaymentStatus[status] || status;
const getTranslatedMethod = (method) => PaymentMethod[method] || method;
const getTranslatedDetail = (detail) => StatusDetail[detail] || detail;
const GetTranslatedCardFlag = ({ flag }) => PaymentFlag[flag] || "";
