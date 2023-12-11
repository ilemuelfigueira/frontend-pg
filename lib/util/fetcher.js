export async function fetcher(path, headers = new Headers()) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${path}`;

  console.debug(`[fetcher] path: ${JSON.stringify(path)}`);

  const res = await fetch(url, {
    cache: "no-store",
    headers,
    next: {
      tags: ["fetcher", path],
    },
  });

  if (!res.ok) {
    const error = await res.json();
    return {
      error,
      status: res.status,
    };
  }

  return res.json();
}
