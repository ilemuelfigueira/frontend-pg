import { Enderecos } from "@/components/Enderecos";
import { objectToQueryString } from "@/lib/util";
import { serverFetcher } from "@/lib/util/server-fetcher";
import { createServerSupabaseClient } from "@/lib/util/supabase";
import Link from "next/link";
import { redirect } from "next/navigation";

async function loadData() {
  const supabase = createServerSupabaseClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/");
  }

  const enderecos = await serverFetcher("/api/enderecos");

  if (enderecos.error) throw new Error(enderecos.error);

  return enderecos;
}

/**
 *
 * @param {import("next").GetServerSidePropsContext} props
 * @returns
 */
export default async function EnderecosPage(props) {
  const enderecos = await loadData();

  return <Enderecos enderecos={enderecos} />;
}
