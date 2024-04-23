"use client";

import { aplicarMascara } from "@/lib/util";
import { Button, Result } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { Clipboard } from "../../components/Clipboard";

export const Client = ({ ...props }) => {
  const getStatus = (param) => {
    switch (param) {
      case "success":
        return "success";
      case "failure":
        return "error";
      case "pending":
        return "info";
      default:
        return "info";
    }
  };

  const getTitleFromStatus = (status) => {
    switch (status) {
      case "success":
        return "O Pagamento do pedido foi efetuado com sucesso!";
      case "error":
        return "Ops! Ocorreu algum problema ao processar o pagamento.";
      case "info":
        return "O pagamento ainda não foi processado.";
    }
  };

  const router = useRouter();
  const query = useSearchParams();

  const statusForComponent = getStatus(props?.status);

  const title = getTitleFromStatus(statusForComponent);

  const goto_pedidos = () => router.push("/pedidos");
  const goto_produtos = () => router.push("/produtos");

  const getTipoPagamento = (raw_tipo) => {
    switch (raw_tipo) {
      case "credit_card":
        return "Cartão de Crédito";
      case "debit_card":
        return "Cartão de Débito";
      case "ticket":
        return "Boleto";
      case "account_money":
        return "Transferência";
      default:
        "Outros";
    }
  };

  const getPagamentoStatus = (status) => {
    switch (status) {
      case "success":
        return "PAGO";
      case "failure":
        return "FALHA";
      case "pending":
        return "PENDENTE";
    }
  };

  const status_pagamento = getPagamentoStatus(props.status);

  const tipo_pagamento = getTipoPagamento(props.tipo_pagamento);

  return (
    <Result
      status={statusForComponent}
      title={title}
      subTitle=""
      extra={
        <result-container className="flex w-full flex-col items-center gap-8">
          <ul className="flex w-[330px] flex-col items-center justify-start gap-2 text-sm">
            <Row label="Código Pedido" value={props?.codigo_pedido} />
            <Row label="Código Pagamento" value={props?.codigo_pagamento} />

            <Row label="Data Pagamento" value={props?.data_pagamento} />

            <Row label="Tipo Pagamento" value={tipo_pagamento} />

            <Row
              label="Valor"
              value={`R$ ${aplicarMascara(props.valor, "real")}`}
            />

            <Row label="Status Pagamento" value={status_pagamento} />
          </ul>

          <footer className="col-span-2 flex w-[330px] items-center justify-center gap-4">
            <Button onClick={goto_pedidos} type="primary" key="pedidos">
              Ver Pedidos
            </Button>

            <Button onClick={goto_produtos} key="comprando">
              Continuar Comprando
            </Button>
          </footer>
        </result-container>
      }
    />
  );
};

const Row = ({ label = "label", value = "value" }) => {
  const normalizeValue = (param) => {
    if (param.length > 20)
      return (
        <>
          {param.slice(0, 15)}...
          <Clipboard label={label} text={param} />
        </>
      );

    return param;
  };
  return (
    <li className="flex w-full items-center justify-between gap-14">
      <span>{label}</span>

      <span className="text-end font-medium">{normalizeValue(value)}</span>
    </li>
  );
};
