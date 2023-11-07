"use server";

import { client } from "@/lib/prisma-client";
import { createServerSupabaseClient } from "@/lib/util/supabase";

export async function removerPacoteDoCarrinho(cdpacote, cb) {
  const supabase = createServerSupabaseClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("Usuário não autenticado");
  }

  await client.$transaction(async (prisma) => {
    await prisma.pacote_item.deleteMany({
      where: {
        cdpacote,
      },
    });

    await prisma.pacote_foto.deleteMany({
      where: {
        cdpacote,
      },
    });

    await prisma.carrinho_pacote.deleteMany({
      where: {
        cdpacote,
        carrinho: {
          cdusuario: session.user.id,
          sgcarrinhosituacao: "PEN",
        },
      },
    });

    await prisma.pacote.deleteMany({
      where: {
        cdpacote,
      },
    });
  });

  cb;
}
