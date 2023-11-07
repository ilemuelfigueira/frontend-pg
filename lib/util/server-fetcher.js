"use server";

import { cookies } from "next/headers";
import { fetcher } from "./fetcher";

export async function serverFetcher(url) {
  const headers = new Headers();

  headers.append("cookies", cookies().toString());

  return await fetcher(url, headers);
}
