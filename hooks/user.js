import { useUserStore } from "@/store/user";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export function useUser() {
  const supabase = createClientComponentClient();
  const router = useRouter()

  const [userSession, _] = useState(async () => {
    const {
      data
    } = await supabase.auth.getSession();

    const session = data.session

    if (session) {
      const user = session.user;

      substituirUsuario({
        cdUsuario: user.id,
        nmEmail: user.email,
        nmTelefone: user.phone,
      });

      return user;
    }

    sair()
  });

  const { state, actions } = useUserStore();

  function existeUsuario() {
    return state.nmEmail && state.cdUsuario;
  }

  function substituirUsuario(props) {
    if(!props) return
    const chavesObjetoParametro = Object.keys(props);

    for (const chave of chavesObjetoParametro) {
      actions.update(chave, props[chave]);
    }
  }

  function limparObjeto(props) {
    const chavesObjetoParametro = Object.keys(props);

    let result = {}

    for (const chave of chavesObjetoParametro) {
      result[chave] = undefined
    } 

    return result
  }

  async function sair() {
    await supabase.auth.signOut()
    substituirUsuario(limparObjeto(state))

    toast("Até logo :)")
    router.refresh()
  }

  return {
    user: state,
    existe: existeUsuario(),
    substituirUsuario,
    sair
  };
}
