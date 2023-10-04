import { useFormik } from "formik";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import * as Yup from "yup";

export const useProduct = ({ ...props } = {}) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const {
    WHATSAPP_LOJA = "",
    defaultValues = null,
    validationSchema = Yup.object({
      shape: Yup.string().required("Required"),
      paddles: Yup.string().required("Required"),
      paddlesClick: Yup.string().required("Required"),
      paddlesColor: Yup.string().required("Required"),
      trigger: Yup.string().required("Required"),
      grip: Yup.string().required("Required"),
      vibration: Yup.string().required("Required"),
    }),
  } = props;

  const getDefaultValues = () => {
    let _defaultValues = {
      shape: "",
      paddles: "",
      paddlesClick: "",
      paddlesColor: "",
      trigger: "",
      grip: "",
      faceplateGrip: "",
      vibration: "",
    };

    if (defaultValues)
      _defaultValues = Object.assign(_defaultValues, defaultValues);

    const keys = Object.keys(_defaultValues);

    keys.forEach((key) => {
      if (searchParams.has(key)) _defaultValues[key] = searchParams.get(key);
    });

    return _defaultValues;
  };

  const valuesToQueryString = (values) => {
    const keys = Object.keys(values);
    let queryString = "";

    keys.forEach((key) => {
      queryString += `${key}=${values[key]}&`;
    });

    return queryString;
  };

  const getHostname = () => {
    const hostname = `${window.location.hostname}${pathName}`;
    return hostname.includes("localhost")
      ? "http://localhost:3000"
      : `https://${hostname}`;
  };

  const getLabel = (items, value) => {
    if (!items) return null;
    return items.find((item) => item.value === value)?.label;
  };

  const sendFormToWhatsapp = async () => {
    const validateResponse = await formik.validateForm();

    const isValid = Object.keys(validateResponse).length === 0;

    if (!isValid) return;

    const urlEncodedMessage = encodeURIComponent(
      `Olá, gostaria de um controle com as seguintes características: ${getHostname()}?${valuesToQueryString(
        formik.values,
      )}`,
    );

    const url = `https://wa.me/${WHATSAPP_LOJA}?text=${urlEncodedMessage}`;

    window.open(url, "_blank");
  };

  const sendMessageToWhatsapp = (message) => {
    const urlEncodedMessage = encodeURIComponent(message);

    window.open(
      `https://wa.me/${WHATSAPP_LOJA}?text=${urlEncodedMessage}`,
      "_blank",
    );
  };
  const formik = useFormik({
    initialValues: getDefaultValues(),
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      console.log(values);

      router.push(`${pathName}?${valuesToQueryString(values)}`);
    },
  });

  return {
    formik,
    sendFormToWhatsapp,
    getLabel,
  };
};
