"use client"

import * as yup from 'yup'

export const speakeasyValidationSchema = yup.object({
  shape: yup.string().required("Required"),
  paddles: yup.string().required("Required"),
  paddlesClick: yup.string().when("paddles", (paddles, schema) => {
    if (paddles != 'sem') return schema.required("Este campo é obrigatório")
    return schema
  }),
  paddlesColor: yup.string().when("paddles", (paddles, schema) => {
    if (paddles != 'sem') return schema.required("Este campo é obrigatório")
    return schema
  }),
  trigger: yup.string().required("Required"),
  grip: yup.string().required("Required"),
  faceplateGrip: yup.string().required("Required"),
  vibration: yup.string().required("Required"),
})