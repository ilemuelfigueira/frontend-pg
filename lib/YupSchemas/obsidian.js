"use client";

import * as yup from "yup";

export const obsidianValidationSchema = yup.object({
  shape: yup.string().required("Required"),
  paddles: yup.string().required("Required"),
  hidePaddles: yup.string().optional(),
  paddlesClick: yup.string().nullable().when("hidePaddles", (hidePaddles, schema) => {
    if (hidePaddles == "N") return schema.required("Este campo é obrigatório");
    return schema.optional();
  }),
  paddlesColor: yup.string().nullable().when("hidePaddles", (hidePaddles, schema) => {
    if (hidePaddles == "N") return schema.required("Este campo é obrigatório");
    return schema.optional();
  }),
  trigger: yup.string().required("Required"),
  grip: yup.string().required("Required"),
  faceplateGrip: yup.string().required("Required"),
  vibration: yup.string().required("Required"),
});
