import { NextResponse } from 'next/server';
import estados from "@/public/json/estados.json"
 
export async function GET(_, { params }) {

  const { cep } = params;
 
  const response = await fetch(process.env.CEP_URL.replace("%s", cep));
  const data = await response.json();

  const isError = data.erro;
  if (isError) return NextResponse.json({ erro: "CEP não encontrado"}, { status: 404 });

  const estado = estados.find((estado) => estado.sigla === data.uf);

  data.estado = estado.nome;
 
  return NextResponse.json(data, { status: 200 })
}