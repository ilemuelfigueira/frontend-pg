"use client"

import * as yup from 'yup'

export const criarPedidoValidationSchema = yup.object({
  cdPedido: yup.string().uuid(),
  nmEmail: yup.string().required("o campo nmEmail é obrigatório"),
  nmStore: yup.string().required("o campo nmStore é obrigatório"),
  nmCliente: yup.string().required("o campo nmCliente é obrigatório"),
  nmTelefone: yup.string().required("o campo nmTelefone é obrigatório"),
  nmCEP: yup.string().required("o campo nmCEP é obrigatório"),
  nmEndereco: yup.string().required("o campo nmEndereco é obrigatório"),
  nmCidade: yup.string().required("o campo nmCidade é obrigatório"),
  nmEstado: yup.string().required("o campo nmEstado é obrigatório"),
  nmComplemento: yup.string().required("o campo nmComplemento é obrigatório"),
  nmTotal: yup.string().required("o campo nmTotal é obrigatório"),
  nmObservacoes: yup.string().required("o campo nmObservacoes é obrigatório"),
  produtos: yup.array().of(
    yup.object().shape({
      title: yup.string().required("Título do produto é obrigatório"),
      items: yup.array().of(
        yup.object().shape({
          label: yup.string().required("Label do item é obrigatório"),
          value: yup.string().required("Valor do item é obrigatório")
        })
      )
    })
  )
})