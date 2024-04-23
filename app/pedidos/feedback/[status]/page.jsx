import moment from "moment";
import { Client } from "./client";
import { redirect } from "next/navigation";

export default async function FeedbackPedido({ params, ...props }) {
  if (!props.searchParams) redirect("/");

  const searchParams = new Map(Object.entries(props.searchParams));

  const rawPaymentDataMap = searchParams.has("raw_payment_meta_data")
    ? new URLSearchParams(searchParams.get("raw_payment_meta_data"))
    : null;

  return (
    <>
      <Client
        status={params?.status}
        valor={searchParams.get("value")}
        status_pagamento={searchParams.get("status")}
        codigo_pagamento={rawPaymentDataMap.get("payment_id")}
        codigo_pedido={searchParams.get("cdpedido")}
        tipo_pagamento={rawPaymentDataMap.get("payment_type")}
        data_pagamento={moment(searchParams.get("updated_at")).format(
          "DD-MM-YYYY, hh:mm:ss",
        )}
      />
    </>
  );
}
