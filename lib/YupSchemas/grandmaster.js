"use client"

import * as yup from 'yup'

export const grandmasterValidationSchema = yup.object({
  shape: yup.string().required("Required"),
  paddles: yup.string().required("Required"),
  paddlesClick: yup.string().required("Required"),
  paddlesColor: yup.string().required("Required"),
  trigger: yup.string().required("Required"),
  grip: yup.string().required("Required"),
  vibration: yup.string().required("Required"),
})