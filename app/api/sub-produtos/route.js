import { client } from "@/lib/prisma-client";
import { NextResponse } from "next/server";

export async function GET(_) {
  try {
    const subprodutos = await client.sub_produto.findMany({});

    return NextResponse.json(subprodutos, { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
