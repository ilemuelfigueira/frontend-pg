import { client } from "@/lib/prisma-client";
import { NextResponse } from "next/server";

export async function GET(_, { params }) {
  const { cdproduto } = params;

  try {
    let fotos = await client.$queryRaw`
      select * from produto_foto pf
      where 1=1
        and pf.cdproduto = ${cdproduto}::uuid
    `;

    fotos = fotos.map(foto => ({
      ...foto,
      nmpath: `${process.env.NEXT_PUBLIC_STORAGE_PUBLIC}${foto.nmpath}`
    }))

    return NextResponse.json(fotos, { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
