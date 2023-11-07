import { client } from "@/lib/prisma-client";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(_, { params }) {
  const requestUrl = new URL(_.url);
  const query = requestUrl.searchParams;

  const nmsubprodutofototipo = query.has("nmsubprodutofototipo")
    ? Prisma.sql`and spf.nmsubprodutofototipo ilike ${`%${query.get(
        "nmsubprodutofototipo",
      )}%`}`
    : Prisma.sql``;

  const cdproduto = Prisma.sql`and sp.cdproduto = ${params.cdproduto}::uuid`;

  try {
    let fotos = await client.$queryRaw`
    select 
      spf.*
    from sub_produto_foto spf
    inner join sub_produto sp
    on sp.cdsubproduto = spf.cdsubproduto
    where 1=1
      ${cdproduto}
      ${nmsubprodutofototipo}
    order by 
      spf.nmpath asc
    ;
  `;

    fotos = fotos.map((foto) => ({
      ...foto,
      nmpath: `${process.env.NEXT_PUBLIC_STORAGE_PUBLIC}${foto.nmpath}`,
    }));

    return NextResponse.json(fotos, { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
