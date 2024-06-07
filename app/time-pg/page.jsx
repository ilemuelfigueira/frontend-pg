import ImageSlider from "./components/ImageSlider";
import ImageSlider2 from "./components/ImageSlider2";

export default function Sobre() {
  return (
    <div className="w-full">
      <aside className="-mx-1 -mt-12 mb-12 md:-mx-4 lg:-mx-12">
        <img className="aspect-[16/4] w-full" src="/dualsense-foco.jpg" />
      </aside>

      <ImageSlider2
        data-mode="light"
        title="Conheça o Time"
        items={[
          {
            avatar: "/dualsense-foco.jpg",
            title: "Annye Carolinnye",
            subtitle: "CFO, Administrativo, Atendimento",
            redes: [
              {
                title: "Facebook",
                href: "",
              },
              {
                title: "Instagram",
                href: "",
              },
              {
                title: "Tiktok",
                href: "",
              },
              {
                title: "X",
                href: "",
              },
            ],
          },
          {
            avatar: "/dualsense-foco.jpg",
            title: "Yuri Latway",
            subtitle: "CEO, Administrativo, Produção",
            redes: [
              {
                title: "Facebook",
                href: "",
              },
              {
                title: "Instagram",
                href: "",
              },
              {
                title: "Tiktok",
                href: "",
              },
              {
                title: "X",
                href: "",
              },
            ],
          },
          {
            avatar: "/dualsense-foco.jpg",
            title: "Caio Franco",
            subtitle: "CCO, Artista & Designer, Pinturas",
            redes: [
              {
                title: "Facebook",
                href: "",
              },
              {
                title: "Instagram",
                href: "",
              },
              {
                title: "Tiktok",
                href: "",
              },
              {
                title: "X",
                href: "",
              },
            ],
          },
          {
            avatar: "/dualsense-foco.jpg",
            title: "Lemuel Figueira",
            subtitle: "Desenvolvedor",
            redes: [
              {
                title: "Instagram",
                href: "https://www.instagram.com/iconsagrado/",
              },
              {
                title: "Github",
                href: "https://github.com/ilemuelfigueira",
              },
            ],
          },
        ]}
      />
    </div>
  );
}
