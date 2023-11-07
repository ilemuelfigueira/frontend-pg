import sql, { client } from "@/lib/prisma-client";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

function stringToUndefinedOrNull(text) {
  if (text == "null") return JSON.parse(text);
  if (text == "undefined") return JSON.parse(text);

  return text;
}

export async function GET(req, { params }) {
  const url = new URL(req.url);
  const searchParams = url.searchParams;

  const _cdsubproduto = stringToUndefinedOrNull(params.cdsubproduto);

  if (!_cdsubproduto) return NextResponse.json({}, { status: 400 });

  const nmsubprodutofototipo = searchParams.has("nmsubprodutofototipo")
    ? Prisma.sql`and spft.nmsubprodutofototipo ilike ${
        searchParams.get("nmsubprodutofototipo") + "%"
      }`
    : Prisma.sql``;

  const cdsubproduto = _cdsubproduto
    ? Prisma.sql`and spf.cdsubproduto = ${_cdsubproduto}::uuid`
    : Prisma.sql``;

  try {
    let fotos = await client.$queryRaw`
    select 
      spf.*
    from sub_produto_foto spf
    inner join sub_produto_foto_tipo spft
    on spft.nmsubprodutofototipo = spf.nmsubprodutofototipo
    where 1=1
      ${cdsubproduto}
      ${nmsubprodutofototipo}
    order by 
      spf.nmpath asc,
      spf.nmsubprodutofototipo
    ;
  `;

    if (fotos.length > 0)
      fotos = fotos.map((foto) => ({
        ...foto,
        nmpath: process.env.NEXT_PUBLIC_STORAGE_PUBLIC + foto.nmpath,
      }));

    return NextResponse.json(fotos, { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
