import { FormularioEntrega } from "@/components/FormularioEntrega";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function loadData() {
  const cookiesStore = cookies();

  const supabase = createServerComponentClient({
    cookies: () => cookiesStore,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/", "push");
  }
  
}

export default async function FormularioEntregaPage() {
  await loadData();
  return (
    <>
      <FormularioEntrega
        title="Formulário de Entrega"
        description="Formulário de Entrega"
        icons={{
          icon: "/logo-32x32.png",
        }}
      />
    </>
  );
}
