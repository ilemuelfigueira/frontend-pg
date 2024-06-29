"use client";

import React from "react";
import { useOpen } from "@/hooks/open";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const PaymentDialog = ({ payments = [], children, ...props }) => {
  const { open, handleClose } = useOpen();

  return (
    <Dialog isOpen={open} onClose={handleClose} {...props}>
      <DialogTrigger>
        <Button variant="outline">{children ?? "Trigger"}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Lista de Pagamentos</DialogTitle>
          <DialogClose onClick={handleClose} />
        </DialogHeader>
        <ul className="flex w-full flex-col items-center gap-2 pt-4">
          {payments.map((payment) => (
            <li key={payment.id} style={{ marginBottom: "15px" }}>
              <strong>ID:</strong> {payment.id} <br />
              <strong>Status:</strong> {payment.status} <br />
              <strong>Valor:</strong> {payment.transaction_amount} <br />
              <strong>Email do Comprador:</strong> {payment.payer.email} <br />
              <strong>Data de Criação:</strong>{" "}
              {new Date(payment.date_created).toLocaleString()} <br />
              <strong>Método de Pagamento:</strong> {payment.payment_method_id}{" "}
              <br />
              <strong>Detalhes do Status:</strong> {payment.status_detail}{" "}
              <br />
            </li>
          ))}
        </ul>
        <Dialog.Footer>
          <button onClick={handleClose}>Fechar</button>
        </Dialog.Footer>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;
