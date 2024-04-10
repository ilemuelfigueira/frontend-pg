import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { cache } from "react";

/**
 * @type {import('@supabase/auth-helpers-nextjs').createServerComponentClient}
 */
export const createServerSupabaseClient = cache(() => {
  const cookieStore = cookies();
  return createServerComponentClient({ cookies: () => cookieStore });
});

const voidFunction = () => {};

export const readUserOrThrow = async ({
  onSuccess = voidFunction,
  onExpired = voidFunction,
  onOffline = voidFunction,
}) => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const access_token = cookieStore.get("access_token")?.value;
  const refresh_token = cookieStore.get("refresh_token")?.value;

  if (access_token && refresh_token) {
    const result = await supabase.auth.setSession({
      access_token,
      refresh_token,
    });

    const {
      data: { user },
      error,
    } = result;

    if (!error || user) return onSuccess(user);
    else {
      console.debug(access_token, refresh_token);
      if (onExpired) return onExpired();
      if (onOffline) return onOffline();
    }
  } else if (onOffline) onOffline();
};
