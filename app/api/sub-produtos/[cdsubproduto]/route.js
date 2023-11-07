import { client } from "@/lib/prisma-client";
import { NextResponse } from "next/server";

export async function GET(_, { params }) {
  const { cdsubproduto } = params;

  try {
    const subprodutos = await client.$queryRaw`
      select
        *
      from sub_produto sp
      where 1=1
        and sp.cdsubproduto = ${cdsubproduto}::uuid
    `;

    return NextResponse.json(subprodutos, { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
