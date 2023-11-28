export async function fetcher(url, headers = new Headers()) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}${url}`, {
    cache: "no-store",
    headers: {
      cookie: headers.get("cookies"),
    },
  });

  if (!res.ok) {
    const error = await res.json();
    return {
      error: `Erro ao buscar dados em ${url}\n${res.status} - ${error.trim()}`,
    };
  }

  return res.json();
}