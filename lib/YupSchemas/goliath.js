"use client"

import * as yup from 'yup'

export const goliathValidationSchema = yup.object({
  shape: yup.string().required("Required"),
  paddles: yup.string().required("Required"),
  hidePaddles: yup.string().max(1).optional(),
  paddlesClick: yup.string().nullable().optional().when("hidePaddles", (hidePaddles, schema) => {
    if (hidePaddles.includes('N')) return schema.required("Este campo é obrigatório")
    return schema
  }),
  paddlesColor: yup.string().nullable().optional().when("hidePaddles", (hidePaddles, schema) => {
    if (hidePaddles.includes('N')) return schema.required("Este campo é obrigatório")
    return schema
  }),
  trigger: yup.string().required("Required"),
  grip: yup.string().required("Required"),
  vibration: yup.string().required("Required"),
})