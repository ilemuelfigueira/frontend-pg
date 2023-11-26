import { aplicarMascara } from "@/lib/util";
import { getCepDetails } from "@/services/cep";
import toast from "react-hot-toast";

export function useCepInput(props) {
  function handleChange(event) {
    if (!props.onChange) return;

    event.target.value = aplicarMascara(event.target.value, "cep");

    const isFilled = event.target.value.length === 9;

    if (isFilled && props.onFill) {
      toast.loading("Buscando CEP", { id: "cep" });

      getCepDetails(event.target.value)
        .then((data) => {
          props.onFill(data);
          toast.dismiss("cep");
          if (data.erro) toast.error("CEP não encontrado");
          else toast.success("CEP encontrado");
          console.log(data);
        })
        .catch((err) => {
          props.onFill({ erro: err.message });
        });
    }

    props.onChange(event);
  }

  return {
    handleChange,
  };
}
