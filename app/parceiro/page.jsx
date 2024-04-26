import { Criadores } from "@/components/Criadores";
import If from "@/components/If";
import { onError } from "@/lib/util/error";
import { serverFetcher } from "@/lib/util/server-fetcher";

async function loadData() {
  const dataMap = new Map();

  const parceiros = await serverFetcher("/api/parceiros");

  if (parceiros.error) onError(parceiros.error, "Erro ao carregar parceiros");

  dataMap.set("parceiros", parceiros || []);

  return dataMap;
}

export default async function ParceirosPage() {
  const data = await loadData();

  return (
    <section className="bg-preto flex w-full min-w-full flex-col justify-start">
      <div
        style={{
          backgroundImage:
            "url('https://imgb.ifunny.co/images/4e43fb51fe69abdace022a8db4a80b95c701ef1991af007bd9e1cbf9f0813908_1.jpg')",
        }}
        className="aspect-[16/14] w-full bg-cover bg-center bg-no-repeat md:aspect-[16/6]"
      >
        V
      </div>
      <span className="my-7 w-full text-center text-xl font-semibold text-white md:text-3xl lg:text-4xl">
        Criadores de Conteúdo PG
      </span>

      <If condition={data.has("parceiros")}>
        <Criadores items={[...data.get("parceiros")]} />
      </If>
      {/* <criadores className="grid grid-cols-4 gap-4 px-4">
        <PainelCriador
          title="Bichão Gamer"
          subtitle="Streamer e Criador de Conteúdo"
        />

        <PainelCriador
          title="Savytzz"
          subtitle="Streamer e Criador de Conteúdo"
        />

        <PainelCriador
          title="The Senna"
          subtitle="Streamer e Criador de Conteúdo"
        />

        <PainelCriador
          title="Rhoizz"
          subtitle="Streamer e Criador de Conteúdo"
        />

        <PainelCriador title="LD cria" subtitle="Parceiro PG" />
      </criadores> */}
    </section>
  );
}
