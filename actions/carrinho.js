"use server";

import { fetcher } from "@/lib/util/fetcher";
import { readUserOrThrow } from "@/lib/util/supabase";

export async function cadastrarPacoteCarrinho({ pacote, items, cdproduto }) {
  const headers = new Headers();
  await readUserOrThrow({
    onOffline: () => {
      throw new Error("Usuário não autenticado");
    },
    onSuccess: ({ refresh_token, access_token }) => {
      headers.append("refresh_token", refresh_token);
      headers.append("access_token", access_token);
      headers.append("method", "POST");
    },
  });

  const response = await fetcher("/api/carrinhos/cadastrar", headers, {
    pacote,
    items,
    cdproduto,
  });

  return response;
}
