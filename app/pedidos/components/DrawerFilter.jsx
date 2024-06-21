"use client";

import { Search } from "./admin/Search";
import { Order } from "./admin/Order";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export function DrawerFilter({ searchParams = {}, children, ...props }) {
  return (
    <Drawer {...props}>
      <DrawerTrigger>
        <Button>Filtros e Ordenação</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Filtros e Ordenação</DrawerTitle>
          <DrawerDescription>
            Ajuste filtros e ordene os resultados conforme suas preferências.
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex w-full items-center gap-2 px-4 py-4">
          <Search className="w-full" searchParams={searchParams} />
          <Order className="w-full" searchParams={searchParams} />
        </div>
        <DrawerFooter>
          <DrawerClose>
            <Button type="submit" className="w-full">
              Fechar
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
