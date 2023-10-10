export async function getCepDetails(cep) {
  return await fetch("/api/cep/" + cep)
    .then((res) => res.json());
}
