"use client"

import * as yup from 'yup'

export const grandmasterValidationSchema = yup.object({
  shape: yup.string().required("Required"),
  paddles: yup.string().required("Required"),
  paddlesClick: yup.string().optional().when("paddles", (paddles, schema) => {
    if (paddles != 'sem') return schema.required("Este campo é obrigatório")
    return schema
  }),
  paddlesColor: yup.string().optional().when("paddles", (paddles, schema) => {
    if (paddles != 'sem') return schema.required("Este campo é obrigatório")
    return schema
  }),
  trigger: yup.string().required("Required"),
  grip: yup.string().required("Required"),
  vibration: yup.string().required("Required"),
})