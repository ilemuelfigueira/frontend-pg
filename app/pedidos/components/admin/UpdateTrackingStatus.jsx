"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import { TrackingStatusEnum } from "../../enums";

import * as yup from "yup";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { atualizarStatusRastreio } from "@/actions/pedido";
import toast from "react-hot-toast";
import { useOpen } from "@/hooks/open";

const trackingSchema = yup.object().shape({
  tracking_status: yup
    .string()
    .oneOf(Object.values(TrackingStatusEnum))
    .required("Selecione um status."),
  tracking_code: yup.string().when("tracking_status", {
    is: (value) => value !== TrackingStatusEnum.PENDENTE,
    then: (schema) => schema.required("Digite um código de rastreio"),
    otherwise: (schema) => schema.nullable(),
  }),
});

export function UpdateTrackingStatus({ children, ...props }) {
  const { open, openClose } = useOpen();
  const formik = useFormik({
    initialValues: {
      tracking_status: props["tracking_status"] ?? undefined,
      tracking_code: props["tracking_code"] ?? undefined,
    },
    validationSchema: trackingSchema,
    onSubmit: async (values) => {
      const response = await atualizarStatusRastreio({
        cdpedido: props?.cdpedido,
        ...values,
      });

      if (response.error)
        toast.error(`Tente novamente mais tarde.`, {
          id: `production-status-${props?.cdpedido}`,
        });
      else
        toast.success("Sucesso!", {
          id: `production-status-${props?.cdpedido}`,
        });
      openClose();
    },
  });
  if (props.disabled) return children;
  return (
    <Dialog open={open} onOpenChange={openClose}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Atualizar rastreio</DialogTitle>
          <DialogDescription>
            Faça atualizações no progresso do envio do pedido do cliente.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-1">
            <Label htmlFor="tracking_status" className="text-right">
              Status
            </Label>
            <div className="col-span-3 flex w-full">
              <Select
                className="w-full"
                id="tracking_status"
                onValueChange={(value) => {
                  formik.setFieldValue("tracking_status", value);
                }}
                defaultValue={formik.values.tracking_status}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={TrackingStatusEnum.PENDENTE}>
                    {TrackingStatusEnum.PENDENTE}
                  </SelectItem>
                  <SelectItem value={TrackingStatusEnum.ENTREGUE}>
                    {TrackingStatusEnum.ENTREGUE}
                  </SelectItem>
                  <SelectItem value={TrackingStatusEnum.POSTADO}>
                    {TrackingStatusEnum.POSTADO}
                  </SelectItem>
                  <SelectItem value={TrackingStatusEnum["PROBLEMA NA ENTREGA"]}>
                    {TrackingStatusEnum["PROBLEMA NA ENTREGA"]}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-1">
            <Label htmlFor="tracking_code" className="text-right">
              Código:
            </Label>
            <Input
              error="teste"
              disabled={
                formik.values.tracking_status === TrackingStatusEnum.PENDENTE
              }
              id="tracking_code"
              placeholder="Digite um código de rastreio"
              className="col-span-3"
              name="tracking_code"
              onChange={formik.handleChange}
              value={formik.values.tracking_code}
            />
          </div>
        </div>
        <p className="grid grid-cols-1 place-items-end text-sm">
          <span>
            {formik.touched.tracking_status
              ? formik.errors.tracking_status
              : ""}
          </span>
          <span>
            {formik.touched.tracking_code ? formik.errors.tracking_code : ""}
          </span>
        </p>
        <DialogFooter>
          <DialogTrigger asChild>
            <Button
              disabled={formik.isSubmitting}
              onClick={formik.handleSubmit}
              type="submit"
            >
              Salvar alterações
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
