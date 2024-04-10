const METHODS_WITH_CONTENT_TYPE_JSON = ["POST", "PUT", "PATCH"];

export async function fetcher(path, headers = new Headers(), body = null) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${path}`;

  console.debug(`[fetcher] path: ${JSON.stringify(path)}`);

  console.debug(url)
  const method = headers.get("method") || "GET";

  if (body) body = JSON.stringify(body);
  if (METHODS_WITH_CONTENT_TYPE_JSON.some((item) => item == method))
    headers.append("Content-type", "application/json");

  const res = await fetch(url, {
    cache: "no-store",
    headers,
    method,
    body,
    next: {
      tags: ["fetcher", path],
    },
  });

  if(res.status === 401) return {
    error: `${res.statusText}`,
    status: res.status
  }

  if (!res.ok) {
    const error = await res.json();
    return {
      error: `${error?.message || JSON.stringify(error)}`,
      status: res.status,
    };
  }

  return res.json();
}
