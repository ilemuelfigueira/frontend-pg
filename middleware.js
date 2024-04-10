import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/**
 * @type {import('next/server').Middleware}
 * @param {import('next/server').NextRequest} req
 */
export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  await supabase.auth.getUser();

  return res;
}
