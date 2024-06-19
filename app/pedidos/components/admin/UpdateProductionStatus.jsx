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
import { ProductionStatusEnum } from "../../enums";

import * as yup from "yup";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const trackingSchema = yup.object().shape({
  production_status: yup
    .string()
    .oneOf(Object.values(ProductionStatusEnum))
    .required("Selecione um status."),
});

export function UpdateProductionStatus({ children, ...props }) {
  const formik = useFormik({
    initialValues: {
      production_status: props["production_status"] ?? undefined,
    },
    validationSchema: trackingSchema,
    onSubmit: (values) => {
      console.debug(values);
    },
  });
  if (props.disabled) return children;
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Atualizar produção</DialogTitle>
          <DialogDescription>
            Faça atualizações no progresso da produção do pedido do cliente.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-1">
            <Label htmlFor="production_status" className="text-right">
              Status
            </Label>
            <div className="col-span-3 flex w-full">
              <Select
                className="w-full"
                id="production_status"
                onValueChange={(value) => {
                  formik.setFieldValue("production_status", value);
                }}
                defaultValue={formik.values.production_status}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ProductionStatusEnum.PENDENTE}>
                    {ProductionStatusEnum.PENDENTE}
                  </SelectItem>
                  <SelectItem value={ProductionStatusEnum.PRODUCAO}>
                    {ProductionStatusEnum.PRODUCAO}
                  </SelectItem>
                  <SelectItem value={ProductionStatusEnum.FINALIZADO}>
                    {ProductionStatusEnum.FINALIZADO}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <p className="grid grid-cols-1 place-items-end text-sm">
          <span>
            {formik.touched.production_status
              ? formik.errors.production_status
              : ""}
          </span>
        </p>
        <DialogFooter>
          <Button onClick={formik.handleSubmit} type="submit">
            Salvar alterações
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
