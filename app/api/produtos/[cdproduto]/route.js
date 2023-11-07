import { client } from "@/lib/prisma-client";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { cdproduto } = params;

  try {
    const produto = await client.$queryRaw`
    select 
      p.*
    from produto p
    where 1=1
      and p.cdproduto = ${cdproduto}::uuid
  `;

    return NextResponse.json(produto[0], { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
