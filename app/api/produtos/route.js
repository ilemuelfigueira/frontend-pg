import { client } from "@/lib/prisma-client";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request) {
  const requestUrl = new URL(request.url);
  const query = requestUrl.searchParams;

  const nmproduto = query.has("nmproduto")
    ? Prisma.sql`and p.nmproduto ilike ${`%${query.get("nmproduto")}%`}`
    : Prisma.sql``;

  const deproduto = query.has("deproduto")
    ? Prisma.sql`and p.deproduto ilike ${`%${query.get("deproduto")}%`}`
    : Prisma.sql``;

  const nmprodutotipo = query.has("nmprodutotipo")
    ? Prisma.sql`and p.nmprodutotipo ilike ${`%${query.get("nmprodutotipo")}%`}`
    : Prisma.sql``;

  try {
    const produtos = await client.$queryRaw`
      select * from produto p
      where 1=1
        ${nmproduto}
        ${deproduto}
        ${nmprodutotipo}
      ;
    `;

    return NextResponse.json(produtos, { status: 200 });
  } catch (error) {
    return NextResponse.error(error, { status: 500 });
  }
}
