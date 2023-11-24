import { IlustracoesHomePage } from "@/components/IlustracoesHomePage";
import { IlustracoesExclusivos } from "@/components/IlustracoesHomePage/exclusivos";

export default function Home() {
  return (
    <main className="flex w-full flex-col items-center justify-start gap-20 p-2">
      <header className="flex flex-col items-center justify-center">
        <span className="text-2xl font-bold tracking-wide text-slate-800 md:text-3xl text-center">
          Evolua o nível da sua jogatina.
        </span>
        <span className="text-lg font-medium tracking-tighter text-slate-500 md:text-2xl text-center">
          Não deixe a sua gameplay ser limitada por um controle comum.
        </span>
      </header>
      <IlustracoesHomePage />
      {/* <IlustracoesExclusivos /> */}
    </main>
  );
}
