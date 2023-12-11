import { aplicarMascara } from "@/lib/util";
import { verificarSeUsuarioExiste } from "@/services/usuarios";
import toast from "react-hot-toast";

export function useCpfInput(props) {
  function handleChange(event) {
    if (!props.onChange) return;

    event.target.value = aplicarMascara(event.target.value, "cpf");

    props.onChange(event);
  }

  return {
    handleChange,
  };
}
