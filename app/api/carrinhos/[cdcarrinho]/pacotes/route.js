import { client } from "@/lib/prisma-client";
import { createServerSupabaseClient } from "@/lib/util/supabase";
import { NextResponse } from "next/server";

/**
 *
 * @param {import('next').NextApiRequest} req
 */
export async function GET(req, { params }) {
  const { cdcarrinho } = params;

  const supabase = createServerSupabaseClient();

  const {
    data: { session },
  } = await supabase.auth.getSession(req);

  if (!session)
    return NextResponse.json("Usuário não autenticado", { status: 401 });

  const carrinho = await client.carrinho.findFirstOrThrow({
    where: {
      cdcarrinho,
      cdusuario: session.user.id,
    },
  });

  if (!carrinho)
    return NextResponse.json("Carrinho não encontrado", { status: 404 });

  const pacotes = await client.$queryRaw`
      select distinct 
        p.cdpacote, 
        p.cdusuario, 
        p.nmpacote,
        pi2.cdproduto,
        pr.nmproduto,
        pr.deproduto,
        pr.nmprodutotipo,
        cp.nuqtdpacote,
        p.nmpathname,
        CONCAT(pr.nmprodutotipo, ' - ', pr.nmproduto) as concat_nmproduto,
	      string_agg(CONCAT(spt.nmsubprodutotipo, ' - ', sp.nmsubproduto), ', ') as concat_nmsubprodutotipo,
        string_agg(sp.nmsubproduto, ', ') as concat_nmsubproduto,
        CONCAT(${process.env.STORAGE_PRODUTOS}, COALESCE(pf2.nmpath, pf.nmpath)) as nmpath,
        (SUM(COALESCE(spp.vlsubproduto, 0)) + COALESCE(pp.vlproduto, 0)) * cp.nuqtdpacote as vlpacote
      from carrinho_pacote cp
      inner join pacote p 
        on p.cdpacote = cp.cdpacote 
      inner join pacote_item pi2 
        on pi2.cdpacote = p.cdpacote 
      left join (
        select * from produto_foto pf
        limit 1
      ) as pf
        on pf.cdproduto = pi2.cdproduto 
      left join pacote_foto pf2
        on pf2.cdpacote = p.cdpacote
      inner join produto pr
        on pr.cdproduto = pi2.cdproduto
      left join sub_produto sp
        on sp.cdsubproduto = pi2.cdsubproduto
      left join sub_produto_tipo spt
        on spt.cdsubprodutotipo = sp.cdsubprodutotipo
      left join produto_preco pp 
        on pp.cdproduto = pr.cdproduto
      left join sub_produto_preco spp
        on spp.cdsubproduto = sp.cdsubproduto
      where 1=1
        and cp.cdcarrinho = ${cdcarrinho}::uuid
      group by 
        p.cdpacote, 
        p.nmpathname,
        cp.nuqtdpacote,
        pi2.cdproduto, 
        pf.nmpath, 
        pf2.nmpath,
        pr.nmproduto, 
        pr.deproduto,
        pr.nmprodutotipo, 
        pp.vlproduto, 
        cp.nuqtdpacote
      ;
  `;

  return NextResponse.json(pacotes, { status: 200 });
}
