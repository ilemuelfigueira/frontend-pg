"use server";

import { fetcher } from "@/lib/util/fetcher";
import { createServerSupabaseClient } from "@/lib/util/supabase";

export async function cadastrarPedido({ cdcarrinho, cdendereco}, cb) {
  const supabase = createServerSupabaseClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("Usuário não autenticado");
  }

  const headers = new Headers()

  headers.append("method", "POST")

  headers.append("refresh_token", session.refresh_token)
  headers.append("access_token", session.access_token)
  headers.append("body", {
    cdcarrinho,
    cdendereco
  })

  const response = await fetcher('/pedidos', headers)

  console.debug(`@/pedidos POST \n ${JSON.stringify(response)}`)

  cb(response)
}
