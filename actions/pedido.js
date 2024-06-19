"use server";

import { fetcher } from "@/lib/util/fetcher";
import {
  readUserOrThrow,
} from "@/lib/util/supabase";
import { revalidateTag } from "next/cache";

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

  revalidateTag('/api/pedidos')

  if (cb) cb(response);
  return response;
}

export async function atualizarStatusRastreio({
  cdpedido,
  tracking_status,
  tracking_code
}, cb) {
  const headers = new Headers();
  await readUserOrThrow({
    onOffline: () => {
      throw new Error("Usuário não autenticado");
    },
    onSuccess: ({ refresh_token, access_token }) => {
      headers.append("refresh_token", refresh_token);
      headers.append("access_token", access_token);
      headers.append("method", "PUT");
    },
  });

  const response = await fetcher(`/api/pedidos/${cdpedido}/tracking-status`, headers, {
    cdpedido,
    tracking_code,
    tracking_status
  });

  if(response?.error) {
    console.error(`Erro ao atualizar status rastreio do pedido.`)
    console.error(response?.error)
  }

  revalidateTag('/api/pedidos')

  if (cb) cb(response)
  return response
}

export async function atualizarStatusProducao({
  cdpedido,
  production_status
}, cb) {
  const headers = new Headers();
  await readUserOrThrow({
    onOffline: () => {
      throw new Error("Usuário não autenticado");
    },
    onSuccess: ({ refresh_token, access_token }) => {
      headers.append("refresh_token", refresh_token);
      headers.append("access_token", access_token);
      headers.append("method", "PUT");
    },
  });

  const response = await fetcher(`/api/pedidos/${cdpedido}/production-status`, headers, {
    cdpedido,
    production_status
  });

  if(response?.error) {
    console.error(`Erro ao atualizar status de produção do pedido.`)
    console.error(response?.error)
  }

  revalidateTag('/api/pedidos')

  if (cb) cb(response)
  return response
}
