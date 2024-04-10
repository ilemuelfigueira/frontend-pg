"use server";

import { cookies } from "next/headers";
import { fetcher } from "./fetcher";

export async function serverFetcher(url) {
  const headers = new Headers();

  const cookieStore = cookies();

  headers.append("cookies", cookies().toString());
  if (cookieStore.has("access_token"))
    headers.append("access_token", cookieStore.get("access_token").value);
  if (cookieStore.has("refresh_token"))
    headers.append("refresh_token", cookieStore.get("refresh_token").value);

  const result = await fetcher(url, headers);

  return result;
}
