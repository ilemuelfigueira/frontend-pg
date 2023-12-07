import { client } from "@/lib/prisma-client";
import { createServerSupabaseClient } from "@/lib/util/supabase";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  const supabase = createServerSupabaseClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = session.user;

  if (!session)
    return NextResponse.json("Usuário não autenticado", { status: 401 });

  const result = await client.pedido.findMany({
    where: {
      cdusuario: user.id,
      dtremovido: null,
    },
  });

  return NextResponse.json(result, { status: 200 });
}
