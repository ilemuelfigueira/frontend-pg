import estados from "@/public/json/estados.json";

export async function getCepDetails(cep) {
  let res = await fetch(`https://viacep.com.br/ws/${cep}/json/`).then((res) =>
    res.json(),
  );

  const nmestado = estados.find((estado) => estado.sigla === res.uf)?.nome;

  return Object.assign(res, { estado: nmestado });
}
