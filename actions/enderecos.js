"use server";

import { client } from "@/lib/prisma-client";
import { createServerSupabaseClient } from "@/lib/util/supabase";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import moment from "moment";
import { revalidateTag } from "next/cache";

dayjs.extend(customParseFormat);

export async function upsertEndereco(endereco) {
  const {
    cdendereco,
    nmcidade,
    nmestado,
    nmendereco,
    nuendereco,
    nucep,
    nutelefone,
    deobservacoes,
    dtnascimento,
    nmresponsavel,
    nmemail,
    nmuf,
    nmcomplemento,
    flpadrao,
  } = endereco;
  const supabase = createServerSupabaseClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("Usuário não autenticado");
  }

  await client.$transaction(async (transaction) => {
    if (flpadrao === "S") {
      await transaction.endereco.updateMany({
        data: {
          flpadrao: "N",
        },
        where: {
          cdusuario: session.user.id,
        },
      });
    }

    if (cdendereco) {
      const enderecoBefore = await transaction.endereco.findUnique({
        where: {
          cdendereco: cdendereco,
          cdusuario: session.user.id,
        },
      });

      const endereco = await transaction.endereco.update({
        data: {
          flpadrao: flpadrao || enderecoBefore.flpadrao,
          nmcidade: nmcidade,
          nmestado: nmestado,
          nmendereco: nmendereco,
          nuendereco: nuendereco,
          nucep: nucep,
          nmuf: nmuf,
          nutelefone: nutelefone,
          deobservacoes: deobservacoes,
          dtnascimento: moment(dtnascimento, "DD/MM/YYYY").toISOString(),
          nmresponsavel: nmresponsavel,
          nmemail: nmemail,
          nmcomplemento: nmcomplemento,
        },
        where: {
          cdusuario: session.user.id,
          cdendereco: cdendereco,
        },
      });

      return endereco;
    }

    const endereco = await transaction.endereco.create({
      data: {
        nmcidade: nmcidade,
        nmestado: nmestado,
        nmendereco: nmendereco,
        nuendereco: nuendereco,
        nucep: nucep,
        nmuf: nmuf,
        nutelefone: nutelefone,
        deobservacoes: deobservacoes,
        cdusuario: session.user.id,
        dtnascimento: moment(dtnascimento, "DD/MM/YYYY").toISOString(),
        nmresponsavel: nmresponsavel,
        nmemail: nmemail,
        nmcomplemento: nmcomplemento,
      },
    });

    return endereco;
  });

  revalidateTag('/api/enderecos')
}

export async function removerEndereco({ cdendereco }) {
  const supabase = createServerSupabaseClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("Usuário não autenticado");
  }

  await client.$transaction(async (transaction) => {
    await transaction.endereco.delete({
      where: {
        cdendereco,
        users: {
          id: session.user.id,
        },
      },
    });
  });
}
