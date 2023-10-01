import Product from "./components/Product";

export const metadata = {
  title: "PG CUSTOM - Obsidian",
  description: "Controle Obsidian",
  icons: {
    icon: "/pg-logo1.png",
  },
};

export default function ControleVariavel() {
  return (
    <div className="flex w-full max-lg:flex-col max-lg:items-center max-lg:gap-4 lg:items-start lg:justify-center lg:gap-4">
      <div className="#header flex w-full flex-col items-start whitespace-nowrap tracking-tighter lg:hidden">
        <h2 className="flex-1 text-4xl font-black tracking-tighter">
          PG GOLIATH
        </h2>
        <span className="text-base font-bold">
          a partir de <strong className="text-green-400">R$ 399,99</strong>
        </span>
      </div>
      <div className="#banners m-0 flex h-fit w-full min-w-[380px] max-w-[900px] flex-wrap justify-evenly gap-3 p-0 max-lg:hidden">
        <img
          className="aspect-square w-[48%] flex-[0,0,48%] rounded-xl shadow-md duration-300 hover:shadow-xl"
          src="reflex-pro-frente.png"
          alt=""
        />
        <img
          className="aspect-square w-[48%] flex-[0,0,48%] rounded-xl shadow-md duration-300 hover:shadow-xl"
          src="reflex-pro-costas.png"
          alt=""
        />
        <img
          className="aspect-square w-[48%] flex-[0,0,48%] rounded-xl shadow-md duration-300 hover:shadow-xl"
          src="reflex-pro-combo.png"
          alt=""
        />
        <video
          className="aspect-square w-[48%] flex-[0,0,48%] rounded-xl shadow-md duration-300 hover:shadow-xl"
          loop={true}
          controls={true}
          muted={true}
          playsInline={true}
          autoPlay={true}
          preload="metadata"
          src="reflex-pro-apresentacao.mp4"
        ></video>
      </div>
      <Product />
    </div>
  );
}
