import { getYupSchema } from "@/lib/YupSchemas"

export async function criarPedido(body) {
  const schema = getYupSchema('criarpedido')

  body.nmEmail = process.env.EMAIL_EMPRESA || 'lfigueiradev@gmail.com'
  
  try {
    await schema.validate(body)

    return await fetch("/api/email/criar-pedido", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      }
    })
  } catch (error) {
    throw new Error(error.message)
  }
}