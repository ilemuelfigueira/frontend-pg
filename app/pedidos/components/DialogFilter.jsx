"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Search } from "./admin/Search";
import { Order } from "./admin/Order";
import { Button } from "@/components/ui/button";
import { useOpen } from "@/hooks/open";

export function DialogFilter({ searchParams = {}, children, ...props }) {
  const { open, openClose, handleClose } = useOpen();
  return (
    <Dialog open={open} onOpenChange={openClose} {...props}>
      <DialogTrigger>
        <Button variant="outline">Filtros e Ordenação</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filtros e Ordenação</DialogTitle>
          <DialogDescription>
            Ajuste filtros e ordene os resultados conforme suas preferências.
          </DialogDescription>
        </DialogHeader>
        <div className="flex w-full items-center gap-2 pt-4">
          <Search className="w-full" searchParams={searchParams} />
          <Order className="w-full" searchParams={searchParams} />
        </div>
        <DialogFooter>
          <Button onClick={handleClose} type="submit" className="w-full">
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
