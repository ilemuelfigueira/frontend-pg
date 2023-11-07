import { client } from "@/lib/prisma-client";
import { NextResponse } from "next/server";

export async function GET(_, { params }) {
  const { cdproduto } = params;

  try {
    const precos = await client.$queryRaw`
      select 
        spp.*
      from sub_produto_preco spp
      inner join sub_produto sp
      on sp.cdsubproduto = spp.cdsubproduto
      where 1=1
        and spp.dtinicio <= now()
        and (spp.dtfim is null or spp.dtfim >= now())
        and sp.cdproduto = ${cdproduto}::uuid
      ;
    `;

    return NextResponse.json(precos, { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
