import sql, { client } from "@/lib/prisma-client";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(_, { params }) {
  const { cdproduto } = params;

  const requestUrl = new URL(_.url);

  const query = requestUrl.searchParams;

  const nmsubprodutotipo = query.has("nmsubprodutotipo")
    ? Prisma.sql`and sp.nmsubprodutotipo = ${query.get("nmsubprodutotipo")}`
    : Prisma.sql``;

  try {
    let subprodutos = await client.$queryRaw`
      select 
        sp.*,
        REPLACE(sp.nmsubproduto, '\\n', '\n') as nmsubproduto
      from sub_produto sp
      inner join sub_produto_preco spp
      on spp.cdsubproduto = sp.cdsubproduto
      and spp.dtinicio <= now()
      and (spp.dtfim is null or spp.dtfim >= now())
      where 1=1
        and sp.cdproduto = ${cdproduto}::uuid
        ${nmsubprodutotipo}
      order by 
        spp.vlsubproduto asc;
    `;

    return NextResponse.json(subprodutos, { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
