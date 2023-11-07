"use client"

import * as yup from 'yup'

export const grandmasterValidationSchema = yup.object({
  shape: yup.string().required("Required"),
  paddles: yup.string().required("Required"),
  hidePaddles: yup.string().max(1).optional(),
  paddlesClick: yup.string().optional().when("hidePaddles", (hidePaddles, schema) => {
    if (hidePaddles == "N") return schema.required("Este campo é obrigatório");
    return schema.optional();
  }),
  paddlesColor: yup.string().optional().when("hidePaddles", (hidePaddles, schema) => {
    if (hidePaddles == "N") return schema.required("Este campo é obrigatório");
    return schema.optional();
  }),
  trigger: yup.string().required("Required"),
  grip: yup.string().required("Required"),
  vibration: yup.string().required("Required"),
})