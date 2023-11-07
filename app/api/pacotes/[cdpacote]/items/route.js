import { client } from "@/lib/prisma-client";
import { NextResponse } from "next/server";
import * as yup from "yup";

const postSchema = yup.object().shape({
  items: yup.array().of(
    yup.object().shape({
      cdproduto: yup.string().uuid().required(),
      cdsubproduto: yup.string().uuid().nullable(),
    }),
  ),
});

/**
 * @type {import('next').NextApiHandler}
 * @param {import('next/server').NextRequest} req
 * @param {import('next').GetStaticPropsContext} context
 */
export async function POST(req, context) {
  const { cdpacote } = context.params;

  const supabase = createServerComponentClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = session.user;

  /**
   * @type {{items: {cdproduto: string, cdsubproduto: string}[]}}
   */
  const body = await req.json();

  const validate = await postSchema.isValid(body);

  if (!validate) {
    const errors = await postSchema.validate(body).catch((err) => err.errors);

    return NextResponse.json(
      `Erro ao cadastrar produto/subproduto no pacote \n ${errors.join(
        "--> \n",
      )}`,
      { status: 400 },
    );
  }

  if (!session) throw new Error("Usuário não autenticado");

  const result = await client.$transaction(async (prisma) => {
    const pacote = await prisma.pacote.findFirstOrThrow({
      where: {
        cdpacote: cdpacote,
      },
    });

    const itensDentroDoPacote = await prisma.pacote_item.findMany({
      where: {
        cdpacote: cdpacote,
      },
    });

    const possuiProdutoDiferente = itensDentroDoPacote.some((item) =>
      body.items.some((itemBody) => itemBody.cdproduto !== item.cdproduto),
    );

    if (possuiProdutoDiferente) {
      return NextResponse.json(
        `Não é possível adicionar produtos diferentes no mesmo pacote`,
        { status: 400 },
      );
    }

    const cdproduto = body.items[0].cdproduto;

    const subprodutos = await prisma.sub_produto.findMany({
      where: {
        cdproduto: cdproduto,
        cdsubproduto: {
          in: body.items.map((item) => item.cdsubproduto),
        },
      },
    });

    const produtoTemSubProdutos = subprodutos.length > 0;

    if (produtoTemSubProdutos) {
      const pacoteitem = await prisma.pacote_item.createMany({
        data: subprodutos.map((subproduto) => ({
          cdpacote: pacote.cdpacote,
          cdproduto: subproduto.cdproduto,
          cdsubproduto: subproduto.cdsubproduto,
          cdsubprodutotipo: subproduto.cdsubprodutotipo,
        })),
      });

      return { pacote, pacoteitem };
    }

    const produto = await prisma.produto.findFirstOrThrow({
      where: {
        cdproduto: cdproduto,
      },
    });

    const pacoteitem = await prisma.pacote_item.create({
      data: {
        cdpacote: pacote.cdpacote,
        cdproduto: produto.cdproduto,
        cdsubproduto: null,
        cdsubprodutotipo: null,
      },
    });

    return { pacote, pacoteitem };
  });

  return NextResponse.json(result, { status: 200 });
}

/**
 *
 * @param {import('next').NextApiRequest} req
 */
export async function GET(req, { params }) {
  const { cdpacote } = params;

  const pacoteItems = await client.pacote_item.findMany({
    where: {
      cdpacote: cdpacote,
    },
  });

  return NextResponse.json(pacoteItems, { status: 200 });
}
