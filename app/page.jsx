import { Colecao } from "@/components/Colecao";
import { DizemComponent } from "@/components/Dizem";
import { IlustracoesHomePage } from "@/components/IlustracoesHomePage";
import { onError } from "@/lib/util/error";
import { fetcher } from "@/lib/util/fetcher";
import { AderenciaSVG } from "@/public/home/aderencia";
import { MiraSVG } from "@/public/home/mira";
import { NaoPercaTempoSVG } from "@/public/home/nao-perca-tempo";
import { PinturaSVG } from "@/public/home/pintura";
import Link from "next/link";

import "./globals.css";
import HomeImageSlider from "@/components/HomeImageSlider";

async function loadData() {
  const dataMap = new Map();

  const produtosExclusivos = await fetcher(
    "/api/produtos?nmprodutotipo=CONTROLE_EXCLUSIVO",
  );

  if (produtosExclusivos.error)
    onError(
      produtosExclusivos.error,
      "Erro ao carregar produtos exclusivos das ilustrações",
    );

  dataMap.set("produtosExclusivos", produtosExclusivos);

  return dataMap;
}

export default async function Home() {
  const dataMap = await loadData();

  return (
    <main className="flex w-full flex-col items-center justify-start">
      <div className="z-0 w-full">
        <IlustracoesHomePage />
      </div>
      <section className="grid w-full max-w-page-limit grid-cols-1 gap-14 p-4 md:gap-20 md:p-8 md:py-16">
        <span className="text-center text-3xl font-semibold text-azul_escuro lg:text-5xl">
          Por que escolher um PG?
        </span>

        <div className="flex w-full items-center justify-start gap-9 max-md:flex-col">
          <NaoPercaTempoSVG
            src="/home/icone.svg"
            className="aspect-square w-72 min-w-[200px] lg:w-96"
          />
          <div className="flex max-w-[650px] flex-col items-start gap-1 text-azul_escuro">
            <span className="text-2xl font-medium">
              Não perca tempo para atirar
            </span>

            <span className="text-base">
              Aqui na PG, você tem a opção de transformar os acionadores dos
              seus gatilhos em switches de mouse Omron, proporcionando uma
              sensibilidade incrível e respostas instantâneas! Isso porque o
              percurso de ativação do gatilho é extremamente reduzido, e o
              amortecimento dos switches de mouse permite repetições muito mais
              rápidas.
            </span>
          </div>
        </div>

        <div className="flex w-full flex-col items-center justify-start gap-1 text-azul_escuro">
          <span className="text-2xl font-medium">
            Mantenha-se sempre mirando!
          </span>
          <MiraSVG
            src="/logo-32x32.png"
            className="aspect-square w-72 min-w-[200px] md:w-96 lg:w-[500px]"
          />

          <span className="max-w-[650px] text-base">
            Com nossos Paddles traseiros, você pode simplesmente NUNCA MAIS
            tirar o dedo do analógico! E nós falamos sério: eles permitem que
            você rapidamente pegue o loadout, troque de arma, pule, deite, passe
            placa, tudo isso sem precisar soltar a mira. Se você busca aumentar
            seu desempenho de forma absurda, faça o teste e use os Paddles PG;
            depois, conte pra gente como foi.
          </span>
        </div>

        <div className="flex w-full items-center justify-end gap-9 max-md:flex-col-reverse">
          <div className="flex max-w-[650px] flex-col items-start gap-1 text-azul_escuro">
            <span className="text-2xl font-medium">
              Tenha a aderência perfeita!
            </span>

            <span className="text-base">
              O Grip que desenvolvemos ao longo dos anos é incomparável com os
              outros que você já viu no mercado de customizados. Nossos clientes
              sempre comentam sobre a forma como ele realmente adere à sua
              pegada, proporcionando a estabilidade que você precisa para jogar,
              principalmente para aqueles que suam bastante nas mãos. E claro,
              além do aspecto funcional, o aspecto visual do grip muitas vezes é
              o que faz ele ser desejado pelos clientes, com opções de
              customização e diversas combinações de cores, não poderia ser
              diferente.
            </span>
          </div>
          <AderenciaSVG
            src="/logo-32x32.png"
            className="aspect-square w-72 min-w-[200px] lg:w-96"
          />
        </div>

        <div className="flex w-full items-center justify-start gap-9 max-md:flex-col">
          <PinturaSVG
            src="/logo-32x32.png"
            className="aspect-square w-72 min-w-[200px] lg:w-96"
          />
          <div className="flex max-w-[650px] flex-col items-start gap-1 text-azul_escuro">
            <span className="text-2xl font-medium">
              A pintura é feita para durar!
            </span>

            <span className="text-base">
              As peças da PG são fáceis de reconhecer pela sua estética e beleza
              incrível! Temos o maior leque de opções para customização que você
              já viu, mas isso não é tudo. As nossas pinturas não são feitas
              apenas para você ficar satisfeito no momento em que abrir a caixa,
              e nem apenas no primeiro mês de uso, mas sim, durante anos! Pois
              é, isso não é exagero, nosso processo de pintura é detalhado e
              complexo, ele conta com muitas camadas de base, pigmento e
              acabamento em verniz para manter a sua skin perfeita por muito
              tempo! Te garantimos isso.
            </span>
          </div>
        </div>
      </section>

      <section className="flex w-full flex-col items-start justify-center gap-8 bg-[#303030] pt-4">
        <span className="w-full text-center text-xl font-semibold text-white md:text-4xl">
          Coleções
        </span>
        <Colecao />
      </section>

      <DizemComponent />

      <HomeImageSlider
        className="max-md:hidden"
        data-mode="dark"
        title="Compre por Categoria"
        items={[
          {
            // src: "/dualsense-foco.jpg",
            href: "/produtos?nmproduto=PS5",
            label: "PS5 / PC",
          },
          {
            src: "/dualsense-desfocado.jpg",
            href: "/produtos?nmproduto=PS4",
            label: "PS4 / PC",
          },
          {
            src: "/dualsense-foco.jpg",
            href: "/produtos?nmproduto=XBOX",
            label: "XBOX / PC",
          },
          {
            src: "/dualsense-foco.jpg",
            href: "/produtos?nmproduto=Mouse",
            label: "Mouses",
          },
          {
            src: "/dualsense-foco.jpg",
            href: "/produtos?nmproduto=Arcade",
            label: "Arcades",
          },
        ]}
      />
      <HomeImageSlider
        className="md:hidden"
        cols={2}
        data-mode="dark"
        title="Compre por Categoria"
        items={[
          {
            // src: "/dualsense-foco.jpg",
            href: "/produtos?nmproduto=PS5",
            label: "PS5 / PC",
          },
          {
            src: "/dualsense-desfocado.jpg",
            href: "/produtos?nmproduto=PS4",
            label: "PS4 / PC",
          },
          {
            src: "/dualsense-foco.jpg",
            href: "/produtos?nmproduto=XBOX",
            label: "XBOX / PC",
          },
          {
            src: "/dualsense-foco.jpg",
            href: "/produtos?nmproduto=Mouse",
            label: "Mouses",
          },
          {
            src: "/dualsense-foco.jpg",
            href: "/produtos?nmproduto=Arcade",
            label: "Arcades",
          },
        ]}
      />

      <HomeImageSlider
        className="max-md:hidden"
        title="Mais Populares"
        items={[
          {
            // src: "/dualsense-foco.jpg",
            href: "/produtos?nmproduto=" + "Dualsense Roze",
            label: "Dualsense Roze",
          },
          {
            src: "/dualsense-desfocado.jpg",
            href: "/produtos?nmproduto=" + "Dualsense Rick N Morty",
            label: "Dualsense Rick N Morty",
          },
          {
            src: "/dualsense-foco.jpg",
            href: "/produtos?nmproduto=" + "Dualsense Realeza",
            label: "Dualsense Realeza",
          },
          {
            src: "/dualsense-foco.jpg",
            href: "/produtos?nmproduto=" + "Mouse Customizado",
            label: "Mouse Customizado",
          },
          {
            src: "/dualsense-foco.jpg",
            href: "/produtos?nmproduto=" + "Arcades",
            label: "Arcades",
          },
        ]}
      />
      <HomeImageSlider
        className="md:hidden"
        cols={2}
        title="Mais Populares"
        items={[
          {
            // src: "/dualsense-foco.jpg",
            href: "/produtos?nmproduto=" + "Dualsense Roze",
            label: "Dualsense Roze",
          },
          {
            src: "/dualsense-desfocado.jpg",
            href: "/produtos?nmproduto=" + "Dualsense Rick N Morty",
            label: "Dualsense Rick N Morty",
          },
          {
            src: "/dualsense-foco.jpg",
            href: "/produtos?nmproduto=" + "Dualsense Realeza",
            label: "Dualsense Realeza",
          },
          {
            src: "/dualsense-foco.jpg",
            href: "/produtos?nmproduto=" + "Mouse Customizado",
            label: "Mouse Customizado",
          },
          {
            src: "/dualsense-foco.jpg",
            href: "/produtos?nmproduto=" + "Arcades",
            label: "Arcades",
          },
        ]}
      />

      <section className="hidden w-full">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch">
            <div className="grid place-content-center rounded bg-gray-100 p-6 sm:p-8">
              <div className="mx-auto max-w-md text-center lg:text-left">
                <header>
                  <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
                    Configure o seu!
                  </h2>

                  <p className="mt-4 text-gray-500">
                    Separamos alguns modelos exclusivos para você escolher, e
                    também é possível personalizar o seu controle.
                  </p>
                </header>
              </div>
            </div>

            <div className="lg:col-span-2 lg:py-8">
              <ul className="grid grid-cols-2 gap-4">
                {dataMap.has("produtosExclusivos") ? (
                  dataMap.get("produtosExclusivos")?.items?.map((produto) => (
                    <li
                      style={{
                        flex: "0 0 200px",
                      }}
                      key={produto.cdproduto}
                    >
                      <Link
                        href={`/produtos?cdproduto=${produto.cdproduto}`}
                        className="group block"
                      >
                        <img
                          src={
                            produto.produto_foto[0]?.nmpath || "/no-photo.png"
                          }
                          alt=""
                          className="aspect-square w-full rounded object-cover"
                        />

                        <div className="mt-3">
                          <h3 className="font-medium text-gray-900 group-hover:underline group-hover:underline-offset-4">
                            {produto.nmproduto}
                          </h3>
                        </div>
                      </Link>
                    </li>
                  ))
                ) : (
                  <span>
                    Não foi possível encontrar os produtos exclusivos...
                  </span>
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
