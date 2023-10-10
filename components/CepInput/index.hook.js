import { aplicarMascara } from "@/lib/util";
import { getCepDetails } from "@/services/cep";

export function useCepInput(props) {
  function handleChange(event) {
    if (!props.onChange) return;

    event.target.value = aplicarMascara(event.target.value, "cep");

    const isFilled = event.target.value.length === 9;

    if (isFilled && props.onFill) {
      getCepDetails(event.target.value)
        .then((data) => {
          props.onFill(data)
        })
        .catch((err) => {
          props.onFill({ erro: err.message })
        });
    }

    props.onChange(event);
  }

  return {
    handleChange,
  };
}
