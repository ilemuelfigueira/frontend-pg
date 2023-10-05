import { useFormik } from "formik";
import moment from "moment";

import * as Yup from "yup";

export const useFormularioEntrega = (props) => {
  const toDate = (_, value) => {
    return moment(value, "DD/MM/YYYY").toDate();
  }

  const validationSchema = Yup.object({
    nome: Yup.string().required("* Este campo é obrigatório."),
    email: Yup.string()
      .email("* Digite um email válido")
      .required("* Este campo é obrigatório."),
    telefone: Yup.string()
      .matches(/\(\d{2}\)\s\d{4,5}\-\d{4}/g, "* Atenção no formato do telefone")
      .required("* Este campo é obrigatório."),
    nascimento: Yup.date("* Digite uma data válida").transform(toDate).max(new Date()).required(
      "* Este campo é obrigatório.",
    ),
    cep: Yup.string()
      .max(9)
      .matches(/^[0-9]{5}-[0-9]{3}$/, "* Digite um CEP válido")
      .required("* Este campo é obrigatório."),
    endereco: Yup.string().required("* Este campo é obrigatório."),
    numero: Yup.number().optional(),
    semNumero: Yup.boolean().optional(),
    estado: Yup.string().required("* Este campo é obrigatório."),
    cidade: Yup.string().required("* Este campo é obrigatório."),
    observacoes: Yup.string().optional(),
  });

  function IsError(key, returnType = "boolean") {
    // const condition =
    //   (formik.touched[key] && formik.errors[key]) || !formik.values[key];

    const condition = formik.touched[key] && formik.errors[key];
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
  const formik = useFormik({
    initialValues: {
      nome: "",
      email: "",
      telefone: "",
      nascimento: "",
      cep: "",
      endereco: "",
      numero: "",
      semNumero: false,
      estado: "",
      cidade: "",
      observacoes: "",
    },
    validateOnBlur: false,
    validateOnChange: true,
    validationSchema,
    onSubmit(values) {
      values = validationSchema.cast(values);

      console.log(values);
    },
  });

  return {
    formik,
    IsError,
  };
};
