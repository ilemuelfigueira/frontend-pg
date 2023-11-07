import { client } from "@/lib/prisma-client";
import { NextResponse } from "next/server";

export async function GET(_, { params }) {
  const { cdsubproduto } = params;

  if (
    !cdsubproduto ||
    cdsubproduto.includes("null") ||
    cdsubproduto.includes("undefined")
  )
    return NextResponse.json({
      error: "O campo cdsubproduto é obrigatório",
      status: 400,
    });

  try {
    const precos = await client.$queryRaw`
      select 
        spp.*
      from sub_produto_preco spp
      where 1=1
        and spp.dtinicio <= now()
        and (spp.dtfim is null or spp.dtfim >= now())
        and spp.cdsubproduto = ${cdsubproduto}::uuid
    `;

    return NextResponse.json(precos[0], { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
