"use server";

import { client } from "@/lib/prisma-client";
import { createServerSupabaseClient } from "@/lib/util/supabase";
import * as yup from "yup";

const cadastrarPacoteSchema = yup.object().shape({
  cdproduto: yup.string().uuid().required("campo 'cdproduto' é obrigatório"),
  cdsubprodutos: yup.array().of(yup.string().uuid().optional()),
  pathname: yup.string().optional(),
  foto: yup.object().shape({
    nmpath: yup.string().required("campo 'nmpath' é obrigatório"),
    nmaspect: yup
      .string()
      .oneOf(["16/9", "1/1"])
      .required("campo 'nmaspect' é obrigatório"),
    nmmimetype: yup
      .string()
      .oneOf(["image/jpeg", "image/png", "image/svg"])
      .required("campo 'nmmimetype' é obrigatório"),
  }),
});

/**
 *
 * @param {{cdproduto: string, cdsubprodutos: [], pathname: string, foto: { nmpath: string, nmaspect: string, nmmimetype: string}}} body
 * @param {*} cb
 */
export async function cadastrarPacoteComItens(body, cb) {
  const supabase = createServerSupabaseClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("Usuário não autenticado");
  }

  const user = session.user

  const validate = await cadastrarPacoteSchema.isValid(body);

  if (!validate) {
    const errors = await cadastrarPacoteSchema
      .validate(body)
      .catch((err) => err.errors);

    throw new Error(
      `Erro ao validar os dados do pacote\n ${errors.join("--> \n")}`,
    );
  }

  const { cdproduto, cdsubprodutos = [], foto, pathname } = body;

  await client.$transaction(async (prisma) => {
    const produto = await prisma.produto.findFirstOrThrow({
      where: {
        cdproduto
      }
    })

    const pacote = await prisma.pacote.create({
      data: {
        cdusuario: user.id,
        nmpathname: pathname,
        nmpacote: produto.nmproduto
      },
    });

    await prisma.pacote_foto.create({
      data: {
        cdpacote: pacote.cdpacote,
        nmaspect: foto.nmaspect,
        nmpath: foto.nmpath,
        nmmimetype: foto.nmmimetype,
      }
    })

    if (cdsubprodutos.length > 0) {
      const subprodutos = await prisma.sub_produto.findMany({
        where: {
          cdsubproduto: {
            in: cdsubprodutos,
          },
          cdproduto,
        },
      });

      for (const subproduto of subprodutos) {
        await prisma.pacote_item.create({
          data: {
            cdpacote: pacote.cdpacote,
            cdproduto: subproduto.cdproduto,
            cdsubproduto: subproduto.cdsubproduto,
          },
        });
      }
    } else {
      await prisma.pacote_item.create({
        data: {
          cdpacote: pacote.cdpacote,
          cdproduto,
        },
      });
    }

    const carrinho = await prisma.carrinho.findFirst({
      where: {
        cdusuario: user.id,
        sgcarrinhosituacao: 'PEN'
      }
    })

    await prisma.carrinho_pacote.create({
      data: {
        cdcarrinho: carrinho.cdcarrinho,
        cdpacote: pacote.cdpacote,
        nuqtdpacote: 1,
      }
    })
  });

  cb;
}
