const thumbnail = {
  url: "/sobre-icon.png",
  width: 1200,
  height: 630,
  alt: "Sobre",
};


const defaultMetadata = {
  title: `Sobre | PG CUSTOM`,
  description: 'Jornada time da pgcustom',
  images: [thumbnail],
};

export const metadata = {
  ...defaultMetadata,
  twitter: {
    ...defaultMetadata,
    card: "summary_large_image",
    site: "@pgcustomstore",
    creator: "@pgcustomstore",
  },
  openGraph: {
    ...defaultMetadata,
    type: "website",
    url: `${process.env.NEXT_PUBLIC_DOMAIN}/sobre`,
    siteName: "PG CUSTOM",
  },
};

export default function Sobre() {
  return (
    <div className="w-full">
      <aside className="-mx-1 -mt-12 mb-12 md:-mx-4 lg:-mx-12">
        <img className="aspect-[16/4] w-full" src="/dualsense-foco.jpg" />
      </aside>
      <aside className="flex w-full flex-col gap-9">
        <span className="text-2xl font-semibold text-black md:text-4xl">
          A história da PG se inicia em 2014...
        </span>
        <span className="text-base font-normal text-black">
          Em uma party de amigos jogando Call of Duty, nosso CEO e fundador,
          Yuri Latway, propôs a todos os membros que ele seria capaz de
          modificar os controles (de PS4, na época) assim como algumas empresas
          já faziam no exterior, adicionando paddles traseiros com atalhos para
          otimizar os movimentos e, consequentemente, aumentar a performance.
          Naquela época, esse tipo de controle não era muito acessível para nós
          aqui no Brasil, e a proposta era apenas para melhorar o equipamento
          dos membros do clã, sem a pretensão de vender para outros, muito menos
          tornar isso um negócio; era apenas um hobby.
        </span>
      </aside>

      <aside className="mt-12 grid grid-cols-1 place-items-center items-start gap-12 md:grid-cols-2">
        <img className="aspect-square w-full" src="/dualsense-desfocado.jpg" />
        <span className="text-base font-normal text-black">
          Yuri estudou a melhor forma de realizar o projeto, e então todos
          enviaram seus controles. Começou com materiais improvisados que ele
          encontrava em casa; os paddles eram cortados de tampinhas de tinta
          spray e para conectar os acionadores aos comandos frontais era
          utilizada tinta condutiva de prata. E, claro, a pintura era toda feita
          à mão, assim como fazemos até hoje, porém as técnicas ainda não eram
          tão avançadas. A conclusão foi que o projeto deu certo, e o clã
          inteiro estava aproveitando o novo recurso. Na época, o jogo era CoD:
          Advanced Warfare, aquele que tinha o pulo duplo, então vocês podem
          imaginar como eles gostaram de usar os paddles. Em pouco tempo, os
          outros times e pro-players do cenário ficaram sabendo e procuraram
          Yuri para modificar os seus também.
        </span>
      </aside>

      <aside className="mt-12 grid grid-cols-1 place-items-center items-start gap-12 lg:grid-cols-2">
        <span className="text-base font-normal text-black">
          Tudo sempre foi feito com muito carinho e capricho, e quando isso se
          tornou um negócio, sempre tivemos a preocupação de entregar o nosso
          melhor para os clientes. Desde essa época, algumas interrupções já
          ocorreram na empresa; não estamos atuando integralmente desde 2014, já
          colocamos o projeto em espera e voltamos em 2020. Hoje, a PG pode
          dizer que está definitivamente online! Foram muitos anos de estudo e
          dedicação para aprimorar nossas técnicas e chegar no nível de
          customização que temos atualmente, com incontáveis opções à sua
          escolha. Fomos os primeiros a desenvolver os paddles com clique de
          mouse (início de 2023), e também pioneiros em fazer os grips
          texturizados totalmente personalizáveis e com tantas cores para
          combinar (2016), além dos primeiros a pensar em um modelo de controle
          com 2 paddles e botões laterais de apoio (2020).
        </span>
        <img className="aspect-video w-full" src="/dualsense-foco.jpg" />
      </aside>

      <aside className="mt-12 grid grid-cols-1 items-start gap-12 lg:px-28">
        <span className="text-base font-normal text-black">
          Temos orgulho do que conquistamos e continuamos assim. Nossos artistas
          realizam o trabalho com prazer e não se cansam de pensar em novos
          designs para ter a estética desejada ou então outras formas de
          modificar as peças na parte eletrônica, buscando sempre inovações e
          aperfeiçoando o que já temos para que nossos clientes tenham o máximo
          da performance, sem deixar de lado o visual e o estilo de um controle
          feito sob medida, nos mínimos detalhes. Para isso, também contamos com
          boas ferramentas que nos permitem aplicar nossa criatividade e
          detalhismo ao extremo.
        </span>
        <img className="aspect-video w-full" src="/dualsense-desfocado.jpg" />
        <span className="text-base font-normal text-black">
          Ao longo desse tempo, já fizemos controles personalizados para os
          melhores pro-players, e todos foram aprovados e recomendados.
          Atualmente, nossos parceiros criadores de conteúdo são os mais
          exigentes e comprovam a qualidade do produto que utilizam. Isso
          acontece pelo fato de que nós amamos jogar e sabemos a necessidade que
          os jogadores têm. Somos gamers criando para gamers, e queremos que não
          só os pro-players ou streamers, mas você também tenha a experiência de
          ter o seu próprio PG! Confiamos tanto no que oferecemos que garantimos
          a sua satisfação.
        </span>
      </aside>

      <aside className="mt-12 grid grid-cols-3 place-items-center gap-11 md:grid-cols-3">
        <img className="aspect-square" src="/dualsense-foco.jpg" />
        <img className="aspect-square" src="/dualsense-foco.jpg" />
        <img className="aspect-square" src="/dualsense-foco.jpg" />
      </aside>

      <aside className="mb-32 mt-12">
        <span className="text-lg font-normal md:text-2xl">
          Queremos que você <strong>evolua</strong> significativamente a sua
          gameplay, que <strong>se divirta</strong>, mas também que{" "}
          <strong>ganhe muitos jogos!</strong> E então, conte para seus amigos{" "}
          <strong>o que eles estão perdendo sem um PG!</strong>
        </span>
      </aside>
    </div>
  );
}
