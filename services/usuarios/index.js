import { fetcher } from "@/lib/util/fetcher";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

export async function verificarSeUsuarioExiste(cpf) {
  const response = await fetcher({
    path: `/usuarios/existe?cpf=${cpf}`,
    baseUrl: API_URL,
  });

  if (response.error) throw new Error(response.error);

  return response;
}
