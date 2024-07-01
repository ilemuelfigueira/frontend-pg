"use server";

import { fetcher } from "@/lib/util/fetcher";
import { readUserOrThrow } from "@/lib/util/supabase";
import { revalidateTag } from "next/cache";

export async function updateCarrinhoPacoteQtd(cdpacote, qtd, cb) {
  const headers = new Headers();
  await readUserOrThrow({
    onOffline: () => {
      throw new Error("Usuário não autenticado");
    },
    onSuccess: ({ refresh_token, access_token }) => {
      headers.append("refresh_token", refresh_token);
      headers.append("access_token", access_token);
      headers.append("method", "PATCH");
    },
  });

  const response = await fetcher(`/api/pacotes/${cdpacote}/quantidade/${qtd}`, headers);

  if (response?.error) throw new Error(response?.error)

  revalidateTag('/api/carrinhos');

  cb;
}
