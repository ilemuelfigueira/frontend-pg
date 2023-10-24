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
      ? `http://localhost:3000${pathName}`
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

  const goToDeliveryForm = () => {
    router.push("/formulario-entrega");
  };

  const formik = useFormik({
    initialValues: getDefaultValues(),
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      const hasPaddles = values.paddles != 'sem'

      if (!hasPaddles) {
        values.paddlesClick = undefined
        values.paddlesColor = undefined
      } 

      console.log(values)

      router.push(`${pathName}?${valuesToQueryString(values)}`);
    },
  });

  function buscarPreco(lista, value) {
    if (!lista || !lista.length || !value) return 0;
    return parseFloat(
      lista.find((item) => item.value == value)?.price.replace(",", "."),
    );
  }

  const bannerShape = props.shapes?.find(
    (item) => item.value === formik.values.shape,
  ).items;

  const bannerPaddle = formik.values.paddles
    ? props.banners[formik.values.paddles]
    : props.banners[Object.keys(props.banners)[0]];

  const prices = {
    shape: buscarPreco(props.shapes, formik.values.shape),
    paddles: buscarPreco(props.paddles, formik.values.paddles),
    paddlesClick: buscarPreco(props.paddlesClicks, formik.values.paddlesClick),
    paddlesColor: buscarPreco(props.paddlesColors, formik.values.paddlesColor),
    trigger: buscarPreco(props.triggers, formik.values.trigger),
    grip: buscarPreco(props.grips, formik.values.grip),
    faceplateGrip: buscarPreco(props.faceplateGrips, formik.values.faceplateGrip),
    vibration: buscarPreco(props.vibrations, formik.values.vibration),
  };

  const calcularTotal = () => {
    const formatter = new Intl.NumberFormat("pt-BR");

    return formatter.format(
      prices.shape +
      prices.paddles +
      prices.paddlesClick +
      prices.paddlesColor +
      prices.trigger +
      prices.grip +
      prices.faceplateGrip +
      prices.vibration,
    );
  };

  const showFaceplateGrips =
    props.faceplateGrips && props.faceplateGrips.length > 0;
  
  function onChange(key, value) {
    if (key == 'paddles' && value == 'sem') {
      formik.setFieldValue("paddlesClick", undefined)
      formik.setFieldValue('paddlesColor', undefined)
    }

    formik.setFieldValue(key, value)
  }

  return {
    formik,
    sendFormToWhatsapp,
    getLabel,
    goToDeliveryForm,
    bannerShape,
    bannerPaddle,
    prices,
    calcularTotal,
    showFaceplateGrips,
    onChange
  };
};
