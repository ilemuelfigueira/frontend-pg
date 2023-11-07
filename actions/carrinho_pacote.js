"use server";

import { client } from "@/lib/prisma-client";

export async function updateCarrinhoPacoteQtd(cdpacote, qtd, cb) {
  await client.carrinho_pacote.updateMany({
    data: {
      nuqtdpacote: qtd,
    },
    where: {
      cdpacote,
    },
  });

  cb
}
