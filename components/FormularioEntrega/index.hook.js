import { useFormik } from "formik";
import { Form } from "antd";
import moment from "moment";

import * as Yup from "yup";
import toast from "react-hot-toast";
import { cadastrarEndereco, upsertEndereco } from "@/actions/enderecos";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import estados from "@/public/json/estados.json";

import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export const useFormularioEntrega = (props) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const getRedirectUrl = () => {
    if (searchParams.has("redirect_url")) {
      return searchParams.get("redirect_url");
    }

    return null;
  };

  const toDate = (_, value) => {
    return moment(value, "DD/MM/YYYY").toDate();
  };

  const validationSchema = Yup.object({
    nmresponsavel: Yup.string().required("* Este campo é obrigatório."),
    nmemail: Yup.string()
      .email("* Digite um email válido")
      .required("* Este campo é obrigatório."),
    nutelefone: Yup.string()
      .matches(/\(\d{2}\)\s\d{4,5}\-\d{4}/g, "* Atenção no formato do telefone")
      .required("* Este campo é obrigatório."),
    dtnascimento: Yup.date("* Digite uma data válida")
      .transform(toDate)
      .max(new Date(), "* A data não pode ser maior que hoje")
      .required("* Este campo é obrigatório."),
    nucep: Yup.string()
      .max(9)
      .matches(/^[0-9]{5}-[0-9]{3}$/, "* Digite um CEP válido")
      .required("* Este campo é obrigatório."),
    nmendereco: Yup.string().required("* Este campo é obrigatório."),
    numero: Yup.number().optional(),
    semNumero: Yup.boolean().optional(),
    nmestado: Yup.string().required("* Este campo é obrigatório."),
    nmcidade: Yup.string().required("* Este campo é obrigatório."),
    nmcomplemento: Yup.string().optional(),
    deobservacoes: Yup.string().optional(),
  });

  const valuesToQueryString = (values) => {
    const keys = Object.keys(values);
    let queryString = "";

    keys.forEach((key) => {
      queryString += `${key}=${values[key]}&`;
    });

    return queryString;
  };

  const getFormUrl = (values) => {
    if (!values) return "";
    return `${pathName}?${valuesToQueryString(values)}`;
  };

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
      formik.setTouched({ nucep: true });
      formik.setFieldError("nucep", "* CEP não encontrado");
      return;
    }

    const nmendereco = `${data.logradouro}, ${data.bairro}`;

    handleFormikAndAntdFormChange("nmendereco", nmendereco);
    handleFormikAndAntdFormChange("nmcidade", data.localidade);
    handleFormikAndAntdFormChange("nmestado", data.estado);
  }

  function handleFormikAndAntdFormChange(key, value) {
    formik.setFieldValue(key, value);
    antdForm.setFieldsValue({ [key]: value });
  }

  function dayjsParse(datestring) {
    return dayjs(datestring, "DD/MM/YYYY");
  }

  const [antdForm] = Form.useForm();

  const getDefaultValues = () => {
    let _defaultValues = {
      nmresponsavel: "",
      nmemail: "",
      nutelefone: "",
      dtnascimento: undefined,
      nucep: "",
      nmendereco: "",
      nuendereco: undefined,
      semNumero: false,
      nmestado: "",
      nmcidade: "",
      nmcomplemento: "",
      deobservacoes: "",
    };

    const keys = Object.keys(_defaultValues);

    keys.forEach((key) => {
      if (searchParams.has(key)) {
        let keyValue = searchParams.get(key);

        if (key === "nuendereco") {
          keyValue = Number(searchParams.get(key));
        }

        if (key === "semNumero") {
          keyValue = JSON.parse(searchParams.get(key));
        }

        if (key === "dtnascimento") {
          keyValue = moment(keyValue, "YYYY-MM-DD").format("DD/MM/YYYY");
        }

        _defaultValues[key] = keyValue;
      }
    });

    return _defaultValues;
  };

  function getUfEstado(estado) {
    return estados.find((item) => item.nome === estado).sigla;
  }

  const formik = useFormik({
    initialValues: getDefaultValues(),
    validateOnBlur: false,
    validateOnChange: true,
    validationSchema,
    async onSubmit(values) {
      const url = getFormUrl(values);

      toast.loading("Aguarde...", { id: "cadastrar-nmendereco" });

      const form = {
        nmcidade: values.nmcidade,
        nmresponsavel: values.nmresponsavel,
        nmestado: values.nmestado,
        nmendereco: values.nmendereco,
        nuendereco: values.nuendereco,
        nucep: values.nucep,
        nutelefone: values.nutelefone,
        deobservacoes: values.deobservacoes,
        dtnascimento: values.dtnascimento,
        nmemail: values.nmemail,
        nmcomplemento: values.nmcomplemento,
        nmuf: getUfEstado(values.nmestado),
      };

      console.log(form)

      try {
        if (searchParams.has("cdendereco")) {
          form.cdendereco = searchParams.get("cdendereco");
        }

        await upsertEndereco({
          ...form,
          cdendereco: searchParams.get("cdendereco"),
        });

        toast.dismiss("cadastrar-nmendereco");
        toast.success("Sucesso!");

        if (getRedirectUrl()) {
          return router.push(getRedirectUrl());
        }

        router.push(url);
      } catch (error) {
        toast.dismiss("cadastrar-nmendereco");
        toast.error(error.message);
      }
    },
  });

  return {
    formik,
    antdForm,
    IsError,
    onFillCep,
    dayjsParse,
  };
};
