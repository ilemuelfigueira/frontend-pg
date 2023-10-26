import { useCarrinhoStore } from "@/store/carrinho";
import { useFormik } from "formik";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import * as Yup from "yup";

export const useProduct = ({ ...props } = {}) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const [isModalOpen, triggerModal] = useState(false);

  const confirmModal = {
    open: isModalOpen,
    trigger: triggerModal,
  };

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

  const productSource = () =>
    `${getHostname()}?${valuesToQueryString(formik.values)}`;

  const sendFormToWhatsapp = async () => {
    const validateResponse = await formik.validateForm();

    const isValid = Object.keys(validateResponse).length === 0;

    if (!isValid) return;

    const urlEncodedMessage = encodeURIComponent(
      `Olá, gostaria de um controle com as seguintes características: ${productSource()}`,
    );

    const url = `https://wa.me/${WHATSAPP_LOJA}?text=${urlEncodedMessage}`;

    window.open(url, "_blank");
  };

  const goToDeliveryForm = () => {
    router.push("/formulario-entrega");
  };

  const { state, actions } = useCarrinhoStore();

  const formik = useFormik({
    initialValues: getDefaultValues(),
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      const hasPaddles = values.paddles != "sem";

      if (!hasPaddles) {
        values.paddlesClick = undefined;
        values.paddlesColor = undefined;
      }

      // const produtos = Array.from(state.produtos);
      const produtos = []

      const getItemFromData = (key, value) =>
        value ? props[key].find((item) => item.value == value) : undefined;

      const shape = getItemFromData("shapes", values.shape);
      const paddles = getItemFromData("paddles", values.paddles);
      const paddlesClick = getItemFromData(
        "paddlesClicks",
        values.paddlesClick,
      );
      const paddlesColor = getItemFromData(
        "paddlesColors",
        values.paddlesColor,
      );
      const trigger = getItemFromData("triggers", values.trigger);
      const grip = getItemFromData("grips", values.grip);
      const faceplateGrip = getItemFromData(
        "faceplateGrips",
        values.faceplateGrip,
      );
      const vibration = getItemFromData("vibrations", values.vibration);

      const fields = {
        shape,
        paddles,
        paddlesClick,
        paddlesColor,
        trigger,
        grip,
        faceplateGrip,
        vibration,
      };

      for (const key of Object.keys(fields)) {
        const item = fields[key];
        console.log(JSON.stringify(item));
        if (!item) continue;

        produtos.push({
          label: `${key} (${item.label}${
            item.strongLabel ? ` - ${item.strongLabel}` : ""
          })`,
          value: `${item.price}`,
        });
      }

      actions.update('produtos', [{
        title: props.title,
        items: produtos
      }])

      router.push(`${pathName}?${valuesToQueryString(values)}`);
      router.push(`/formulario-entrega`)
    },
  });

  function buscarPreco(lista, value) {
    if (!lista || !lista.length || !value || value == undefined) return null;
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
    shape: buscarPreco(props.shapes, formik.values.shape) || 0,
    paddles: buscarPreco(props.paddles, formik.values.paddles) || 0,
    paddlesClick:
      buscarPreco(props.paddlesClicks, formik.values.paddlesClick) || 0,
    paddlesColor:
      buscarPreco(props.paddlesColors, formik.values.paddlesColor) || 0,
    trigger: buscarPreco(props.triggers, formik.values.trigger) || 0,
    grip: buscarPreco(props.grips, formik.values.grip) || 0,
    faceplateGrip:
      buscarPreco(props.faceplateGrips, formik.values.faceplateGrip) || 0,
    vibration: buscarPreco(props.vibrations, formik.values.vibration) || 0,
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
    if (key == "paddles" && value == "sem") {
      formik.setFieldValue("paddlesClick", undefined);
      formik.setFieldValue("paddlesColor", undefined);
    }

    formik.setFieldValue(key, value);
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
    onChange,
    confirmModal,
  };
};
