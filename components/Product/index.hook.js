import { cadastrarPacoteComItens } from "@/actions/cadastrar-pacote-carrinho";
import { useCarrinhoStore } from "@/store/carrinho";
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
      hidePaddles: Yup.string().max(1).optional(),
    }),
  } = props;

  const getDefaultValues = () => {
    let _defaultValues = {
      shape: null,
      paddles: null,
      paddlesClick: null,
      paddlesColor: null,
      trigger: null,
      grip: null,
      faceplateGrip: null,
      vibration: null,
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

  const getProductUrl = (values) => {
    if (!values) return "";
    return `${pathName}?${valuesToQueryString(values)}`;
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
    onSubmit: async (values) => {
      if (values.hidePaddles == "S") {
        delete values.paddlesClick;
        delete values.paddlesColor;
      }

      const productUrl = getProductUrl(values);

      const pacote = {
        ...props.produto,
        subprodutos: [],
      };

      delete values.hidePaddles;

      for (const key of Object.keys(values)) {
        const value = values[key];

        if (
          !value ||
          value == undefined ||
          value.includes("null") ||
          value.includes("undefined")
        )
          continue;

        const subproduto = props.subprodutos.find(
          (subproduto) => subproduto.cdsubproduto == value,
        );

        pacote.subprodutos.push(subproduto);
        // pacote.subprodutos.push(value);
      }

      // cadastrarPacoteComItens({
      //   cdproduto: pacote.cdproduto,
      //   cdsubprodutos: pacote.subprodutos.map((subproduto) => subproduto.cdsubproduto),
      //   foto:
      // })

      const bannerPacote = props.subprodutosFotos.filter(
        (foto) => foto.cdsubproduto == values.shape && foto.nmsubprodutofototipo == 'BANNER',
      )[0]

      
      // console.log({ values, productUrl });

      await cadastrarPacoteComItens({
        cdproduto: pacote.cdproduto,
        pathname: productUrl,
        cdsubprodutos: pacote.subprodutos.map(
          (subproduto) => subproduto.cdsubproduto,
        ),
        foto: {
          nmpath: bannerPacote.nmpath.replace(process.env.NEXT_PUBLIC_STORAGE_PUBLIC, ''),
          nmaspect: bannerPacote.nmaspect,
          nmmimetype: bannerPacote.nmmimetype,
        }
      })


      // return;

      // actions.update("produtos", produtos);

      // console.log("producturl \n", productUrl);

      router.push(productUrl);
    },
  });

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
    goToDeliveryForm,
    onChange,
  };
};
