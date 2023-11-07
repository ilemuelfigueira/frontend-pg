import { client } from "@/lib/prisma-client";
import { createServerSupabaseClient } from "@/lib/util/supabase";
import { NextResponse } from "next/server";

export async function GET(_) {
  const supabase = createServerSupabaseClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return NextResponse.json("Usuário não autenticado", { status: 401 });

  const user = session.user;

  const result = await client.carrinho.findFirstOrThrow({
    include: {
      carrinho_situacao: true,
    },
    where: {
      cdusuario: user.id,
      sgcarrinhosituacao: 'PEN',
    },
  });

  return NextResponse.json(result, { status: 200 });
}
