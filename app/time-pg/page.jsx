import ImageSlider2 from "./components/ImageSlider2";

const thumbnail = {
  url: "/time-icon.png",
  width: 1200,
  height: 630,
  alt: "Time",
};


const defaultMetadata = {
  title: `Time | PG CUSTOM`,
  description: 'Nosso time de colaboradores.',
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
    url: `${process.env.NEXT_PUBLIC_DOMAIN}/time-pg`,
    siteName: "PG CUSTOM",
  },
};

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
