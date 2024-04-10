"use server";

import { fetcher } from "@/lib/util/fetcher";
import {
  createServerSupabaseClient,
  readUserOrThrow,
} from "@/lib/util/supabase";

export async function cadastrarPedido({ cdcarrinho, cdendereco }, cb) {
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

  const response = await fetcher("/api/pedidos", headers, {
    cdcarrinho,
    cdendereco,
  });

  if (cb) cb(response);
  return response;
}
