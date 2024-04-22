"use server";

import { cookies } from "next/headers";

export async function cookieRemove(cookieId) {
  const cookieStore = cookies();

  cookieStore.delete(cookieId);
}
