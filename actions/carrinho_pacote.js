"use server";

import { client } from "@/lib/prisma-client";
import { revalidateTag } from "next/cache";

export async function updateCarrinhoPacoteQtd(cdpacote, qtd, cb) {
  await client.carrinho_pacote.updateMany({
    data: {
      nuqtdpacote: qtd,
    },
    where: {
      cdpacote,
    },
  });

  revalidateTag('/api/carrinhos');

  cb;
}
