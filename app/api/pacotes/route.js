import { client } from "@/lib/prisma-client";
import { createServerSupabaseClient } from "@/lib/util/supabase";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import * as yup from "yup";

const schema = yup.object().shape({
  cdusuario: yup.string().uuid().required("campo 'cdusuario' é obrigatório"),
  nmpacote: yup.string().required("campo 'nmpacote' é obrigatório"),
});

export async function POST(req) {
  const supabase = createServerComponentClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session.user;

  const body = await req.json();

  const validate = await schema.isValid(body);

  if (!validate) {
    const errors = await schema.validate(body).catch((err) => err.errors);

    return NextResponse.json(
      `Erro ao validar os dados do carrinho\n ${errors.join("--> \n")}`,
      { status: 400 },
    );
  }

  const result = await client.$transaction(async (prisma) => {
    const pacote = await client.pacote.create({
      data: {
        nmpacote: body.nmproduto,
        cdusuario: user.id,
      },
    });

    return { pacote };
  });

  return NextResponse.json(result, { status: 200 });
}
