import { useFormik } from "formik";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import * as Yup from "yup";

export const useProductForm = ({ defaultValues, ...props } = {}) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const getDefaultValues = () => {
    let _defaultValues = {
      shape: "",
      paddles: "",
      paddlesClick: "",
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

  const getValidationSchema = () => {};
  const formik = useFormik({
    initialValues: getDefaultValues(),
    validationSchema: Yup.object({
      shape: Yup.string().required("Required"),
      paddles: Yup.string().required("Required"),
      paddlesClick: Yup.string().required("Required"),
      trigger: Yup.string().required("Required"),
      grip: Yup.string().required("Required"),
      faceplateGrip: Yup.string().required("Required"),
      vibration: Yup.string().required("Required"),
    }),
    validateOnBlur: false,
    validateOnChange: true,
    onSubmit: (values) => {
      console.log(values);

      router.push(`${pathName}?${valuesToQueryString(values)}`);
    },
  });

  return {
    formik,
  };
};
