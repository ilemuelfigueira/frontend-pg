import Amex from "@/public/card-flags/amex.svg";
import Cabal from "@/public/card-flags/cabal.svg";
import Debcabal from "@/public/card-flags/debcabal.svg";
import Debelo from "@/public/card-flags/debelo.svg";
import Debmaster from "@/public/card-flags/debmaster.svg";
import Debvisa from "@/public/card-flags/debvisa.svg";
import Elo from "@/public/card-flags/elo.svg";
import Hipercard from "@/public/card-flags/hipercard.svg";
import Master from "@/public/card-flags/master.svg";
import Visa from "@/public/card-flags/visa.svg";

export const PaymentStatus = {
  approved: "Aprovado",
  pending: "Pendente",
  rejected: "Rejeitado",
  in_process: "Em Processamento",
  cancelled: "Cancelado",
  refunded: "Reembolsado",
  charged_back: "Chargeback",
};

export const PaymentMethod = {
  credit_card: "Cartão de Crédito",
  debit_card: "Cartão de Débito",
  paypal: "PayPal",
  ticket: "Boleto",
  bank_transfer: "Transferência Bancária",
  pix: "PIX",
  atm: "Caixa Eletrônico",
};

export const PaymentFlag = {
  amex: <Amex />,
  cabal: <Cabal />,
  debcabal: <Debcabal />,
  debelo: <Debelo />,
  debmaster: <Debmaster />,
  debvisa: <Debvisa />,
  elo: <Elo />,
  hipercard: <Hipercard />,
  master: <Master />,
  visa: <Visa />,
};

export const StatusDetail = {
  accredited: "Credenciado",
  pending_contingency: "Pendente de Contingência",
  pending_review_manual: "Pendente de Revisão Manual",
  cc_rejected_call_for_authorize: "Rejeitado, Contate o Emissor",
  cc_rejected_card_disabled: "Rejeitado, Cartão Desativado",
  cc_rejected_card_error: "Rejeitado, Erro no Cartão",
  cc_rejected_duplicated_payment: "Rejeitado, Pagamento Duplicado",
  cc_rejected_high_risk: "Rejeitado, Alto Risco",
  cc_rejected_insufficient_amount: "Rejeitado, Saldo Insuficiente",
  cc_rejected_invalid_installments: "Rejeitado, Parcelas Inválidas",
  cc_rejected_max_attempts: "Rejeitado, Máximo de Tentativas",
  cc_rejected_other_reason: "Rejeitado, Outro Motivo",
};
