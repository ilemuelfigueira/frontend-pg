import { client } from "@/lib/prisma-client";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  if (!params.cdproduto) return NextResponse.json(undefined, { status: 400 });

  const cdproduto = Prisma.sql`and p.cdproduto = ${params.cdproduto}::uuid`;

  try {
    const precos = await client.$queryRaw`
      select 
        pp.* 
      from produto p
      inner join produto_preco pp
      on pp.cdproduto = p.cdproduto
      where 1=1
        and pp.dtinicio <= now()
        and (pp.dtfim is null or pp.dtfim >= now())
        ${cdproduto};
    `;

    return NextResponse.json(precos[0], { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
