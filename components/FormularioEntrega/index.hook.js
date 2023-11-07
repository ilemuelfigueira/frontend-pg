import { useFormik } from "formik";
import { Form } from "antd";
import moment from "moment";

import * as Yup from "yup";
import { criarPedido } from "@/services/email";
import { useCarrinhoStore } from "@/store/carrinho";
import toast from "react-hot-toast";

export const useFormularioEntrega = (props) => {
  const toDate = (_, value) => {
    return moment(value, "DD/MM/YYYY").toDate();
  };

  const validationSchema = Yup.object({
    nome: Yup.string().required("* Este campo é obrigatório."),
    email: Yup.string()
      .email("* Digite um email válido")
      .required("* Este campo é obrigatório."),
    telefone: Yup.string()
      .matches(/\(\d{2}\)\s\d{4,5}\-\d{4}/g, "* Atenção no formato do telefone")
      .required("* Este campo é obrigatório."),
    nascimento: Yup.date("* Digite uma data válida")
      .transform(toDate)
      .max(new Date(), "* A data não pode ser maior que hoje")
      .required("* Este campo é obrigatório."),
    cep: Yup.string()
      .max(9)
      .matches(/^[0-9]{5}-[0-9]{3}$/, "* Digite um CEP válido")
      .required("* Este campo é obrigatório."),
    endereco: Yup.string().required("* Este campo é obrigatório."),
    numero: Yup.number().optional(),
    semNumero: Yup.boolean().optional(),
    estado: Yup.string().required("* Este campo é obrigatório."),
    cidade: Yup.string().required("* Este campo é obrigatório."),
    complemento: Yup.string().optional(),
    observacoes: Yup.string().optional(),
  });

  function IsError(key, returnType = "boolean") {
    const condition = formik.touched[key] && formik.errors[key];

    if (!condition) return;

    switch (returnType) {
      case "boolean":
        return condition;
      case "message":
        return condition ? formik.errors[key] : "";
      case "type":
        return condition ? "error" : "";
      default:
        return condition;
    }
  }

  function onFillCep(data) {
    const isError = Boolean(data.erro);

    if (isError) {
      formik.setTouched({ cep: true });
      formik.setFieldError("cep", "* CEP não encontrado");
      return;
    }

    const endereco = `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`;

    handleFormikAndAntdFormChange("endereco", endereco);
    handleFormikAndAntdFormChange("cidade", data.localidade);
    handleFormikAndAntdFormChange("estado", data.estado);
  }

  function handleFormikAndAntdFormChange(key, value) {
    formik.setFieldValue(key, value);
    antdForm.setFieldsValue({ [key]: value });
  }

  function getTotalProducts(produtos) {
    let total = 0;
    for (const produto of produtos) {
      for (const item of produto.items) {
        total += parseFloat(item.value.replace(",", "."));
      }
    }
    return total;
  }

  const [antdForm] = Form.useForm();

  const { state, actions } = useCarrinhoStore();

  const formik = useFormik({
    initialValues: {
      nome: "",
      email: "",
      telefone: "",
      nascimento: "",
      cep: "",
      endereco: "",
      numero: undefined,
      semNumero: false,
      estado: "",
      cidade: "",
      complemento: "",
      observacoes: "",
    },
    validateOnBlur: false,
    validateOnChange: true,
    validationSchema,
    async onSubmit(values) {
      console.log("@onSubmit -> values", values);

      actions.update("nmCliente", values.nome);
      actions.update("nmTelefone", values.telefone);
      actions.update("nmCEP", values.cep);
      actions.update("nmEndereco", values.endereco);
      actions.update("nmCidade", values.cidade);
      actions.update("nmEstado", values.estado);
      actions.update("nmComplemento", values.complemento);

      const total = getTotalProducts(state.produtos);

      actions.update("nmTotal", total);
      actions.update("nmObservacoes", values.observacoes);
      actions.update("nmEmailCliente", values.email);

      console.log(JSON.stringify(state));

      try {
        await criarPedido(state)
        toast.success('Pedido realizado')
      } catch (error) {
        toast.error(error.message)
      }
    },
  });

  return {
    formik,
    antdForm,
    IsError,
    onFillCep,
  };
};
