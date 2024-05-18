"use client";

import { cookieRemove } from "@/actions/delete-cookie";
import LoginModal from "@/components/Modal/login";
import RegistrarModal from "@/components/Modal/registrar";
import { useOpen } from "@/hooks/open";
import { IconeNavbarSVG } from "@/public/home/icone-navbar";
import {
  AddressBook,
  MagnifyingGlass,
  Receipt,
  ShoppingCart,
  SignIn,
  SignOut,
  User,
} from "@phosphor-icons/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Dropdown, Input } from "antd";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import SubHeader from "./components/SubHeader";

const Container = ({ children, ...props }) => <div {...props}>{children}</div>;

const LogoContainer = ({ children, ...props }) => (
  <div {...props}>{children}</div>
);

const InfoContainer = ({ children, ...props }) => (
  <div className={props?.className}>{children}</div>
);

const MenuItem = ({ href, label, Icon = null, onClick = undefined }) => {
  return (
    <Link className="flex items-center gap-1" href={href} onClick={onClick}>
      <Icon className="cursor-pointer text-xl text-slate-600 lg:text-2xl" />
      {label}
    </Link>
  );
};

export function HeaderNavigator({ user, ...props }) {
  const existeUsuario = Boolean(user);

  const supabase = createClientComponentClient();

  async function sair() {
    await cookieRemove("access_token");
    await cookieRemove("refresh_token");

    await supabase.auth.signOut().then((res) => {
      setTimeout(router.refresh, 1000);
    });
    toast.success("Até logo!", { id: "auth" });
  }

  const searchParams = useSearchParams();
  const router = useRouter();

  const [getSearch, setSearch] = useState(searchParams.get("search") || "");

  const openRegister = useOpen({
    defaultValue: searchParams.get("register") == "true",
  });
  const openLogin = useOpen({
    defaultValue: searchParams.get("login") == "true",
  });

  const openSearch = useOpen({
    defaultValue: false,
  });

  const goToCart = () => {
    if (!existeUsuario) return openLogin.handleOpen();

    router.push("/carrinho");
  };

  const closeLoginOpenRegister = () => {
    openLogin.handleClose();
    openRegister.handleOpen();
  };

  const search = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (getSearch) params.set("nmproduto", getSearch);

    const href = `/produtos?${params.toString()}`;

    openSearch.handleClose();

    router.push(href);
  };

  useEffect(() => {
    if (props.expired_login == "S") {
      toast.error("Autentique-se novamente!", { id: "auth" });
      cookieRemove("access_token");
      cookieRemove("refresh_token");
      setTimeout(() => {
        router.replace("/");
      }, 3000);
    }
  }, []);

  useEffect(() => {
    if (openSearch.open) searchRef.current && searchRef.current.focus();
  }, [openSearch.open]);

  const searchRef = useRef(null);

  const pathName = usePathname();

  return (
    <>
      <Container
        {...props}
        data-ishome={pathName == "/"}
        data-searchopen={openSearch.open}
        className="sticky top-0 z-40 grid h-16 gap-4 w-screen max-w-full grid-cols-3 grid-rows-1 overflow-visible bg-black p-4 shadow-sm data-[ishome=false]:mb-8 data-[ishome=false]:bg-black max-md:grid-cols-2 max-md:data-[searchopen=true]:grid-cols-1 md:data-[ishome=true]:-mb-16"
      >
        <Link
          href={"/"}
          data-is-searchopen={openSearch.open}
          className="w-fit items-center place-self-start self-center max-md:data-[is-searchopen=true]:hidden"
        >
          <LogoContainer className="flex w-fit items-center justify-start gap-2 md:gap-4">
            <IconeNavbarSVG fill="white" className="aspect-square w-6 md:w-8" />
            <span className="whitespace-nowrap text-base font-black text-white md:text-xl lg:text-2xl">
              PG Custom
            </span>
          </LogoContainer>
        </Link>
        <section className="flex w-full items-center justify-center gap-6 place-self-center text-white data-[open=true]:hidden max-md:hidden">
          <span
            tabIndex={0}
            // data-open={openControlesSub.open}
            className="group border-b border-b-transparent py-3 hover:cursor-pointer hover:border-b-focus-blue hover:text-focus-blue focus:border-b-focus-blue focus:text-focus-blue data-[open=true]:border-b-focus-blue data-[open=true]:text-focus-blue"
          >
            Controles
            <SubHeader
              className="hidden cursor-auto group-hover:grid group-focus-within:grid"
              mainColumnList={controleColumns}
            />
          </span>
          <span
            tabIndex={0}
            className="group border-b border-b-transparent py-3 hover:cursor-pointer hover:border-b-focus-blue hover:text-focus-blue focus:border-b-focus-blue focus:text-focus-blue data-[open=true]:border-b-focus-blue data-[open=true]:text-focus-blue"
          >
            Consoles
            <SubHeader
              className="hidden cursor-auto group-hover:grid group-focus-within:grid"
              mainColumnList={consoleColumns}
            />
          </span>
          <span
            tabIndex={0}
            className="group border-b border-b-transparent py-3 hover:cursor-pointer hover:border-b-focus-blue hover:text-focus-blue focus:border-b-focus-blue focus:text-focus-blue data-[open=true]:border-b-focus-blue data-[open=true]:text-focus-blue"
          >
            Mouses
            <SubHeader
              className="hidden cursor-auto group-hover:grid group-focus-within:grid"
              mainColumnList={mouseColumns}
            />
          </span>
          <span
            tabIndex={0}
            className="group border-b border-b-transparent py-3 hover:cursor-pointer hover:border-b-focus-blue hover:text-focus-blue focus:border-b-focus-blue focus:text-focus-blue data-[open=true]:border-b-focus-blue data-[open=true]:text-focus-blue"
          >
            Arcades
            <SubHeader
              className="hidden cursor-auto group-hover:grid group-focus-within:grid"
              mainColumnList={arcadeColumns}
            />
          </span>
          <span
            tabIndex={0}
            className="group border-b border-b-transparent py-3 hover:cursor-pointer hover:border-b-focus-blue hover:text-focus-blue focus:border-b-focus-blue focus:text-focus-blue data-[open=true]:border-b-focus-blue data-[open=true]:text-focus-blue"
          >
            Sobre
            <SubHeader
              className="hidden cursor-auto group-hover:grid group-focus-within:grid"
              mainColumnList={sobreColumns}
            />
          </span>
        </section>
        <InfoContainer
          data-is-searchopen={openSearch.open}
          className="flex max-md:w-full place-self-end self-center items-center justify-end gap-4"
        >
          <section
            data-open={openSearch.open}
            className="relative -mr-2 flex w-full items-center justify-between gap-2 bg-black/90 data-[open=false]:hidden"
          >
            <Input
              ref={searchRef}
              className="z-10 w-full rounded-full border-focus-blue bg-transparent px-4 py-1 text-sm font-normal text-white placeholder:text-focus-blue"
              placeholder="Pesquisar"
              value={getSearch}
              onChange={(e) => setSearch(e.target.value)}
              onBlur={openSearch.handleClose}
              onPressEnter={search}
            />
            <MagnifyingGlass
              onClick={() => router.push("/produtos?nmproduto=" + getSearch)}
              className="pointer-events-none absolute right-2 aspect-square select-none fill-focus-blue text-2xl"
            />
          </section>
          <MagnifyingGlass
            data-show={!openSearch.open}
            onClick={openSearch.openClose}
            className="aspect-square shrink-0 cursor-pointer text-2xl text-white data-[show=false]:hidden"
          />

          <ShoppingCart
            onClick={goToCart}
            className="aspect-square shrink-0 cursor-pointer text-2xl text-white hover:rounded-md"
          />
          <Dropdown
            menu={{
              items: existeUsuario
                ? [
                    {
                      label: (
                        <MenuItem
                          href="/enderecos"
                          label="Endereços"
                          Icon={AddressBook}
                        />
                      ),
                    },
                    {
                      label: (
                        <MenuItem
                          href="/pedidos"
                          label="Pedidos"
                          Icon={Receipt}
                        />
                      ),
                      key: "Pedidos",
                    },
                    {
                      label: (
                        <MenuItem
                          href="#"
                          label={"Sair"}
                          Icon={SignOut}
                          onClick={sair}
                        />
                      ),
                      key: "Sair",
                    },
                  ]
                : [
                    {
                      label: (
                        <MenuItem
                          href={"#"}
                          label={"Entrar"}
                          Icon={SignIn}
                          onClick={openLogin.handleOpen}
                        />
                      ),
                    },
                  ],
            }}
            trigger={["click"]}
          >
            <User className="aspect-square shrink-0 cursor-pointer text-2xl text-white" />
          </Dropdown>
          <LoginModal
            open={openLogin.open}
            okText={"Entrar"}
            onCancel={openLogin.handleClose}
            handleOpenRegister={closeLoginOpenRegister}
          />
          <RegistrarModal
            open={openRegister.open}
            okText={"Registrar"}
            onCancel={openRegister.handleClose}
          />
        </InfoContainer>
      </Container>
    </>
  );
}

const controleColumns = [
  [
    {
      title: "Todos",
      items: [
        {
          label: "PG Painted",
          href: "http://localhost:3000/parceiros",
        },
        {
          label: "Coleção Parceiros PG",
          href: "Envie Seu Controle",
        },
      ],
    },
    {
      title: "PS5 / PC",
      items: [
        {
          label: "Obsidian",
          href: "http://localhost:3000/produtos/?nmproduto=Obsidian",
        },
        {
          label: "Speakeasy",
          href: "http://localhost:3000/produtos/?nmproduto=Speakeasy",
        },
      ],
    },
    {
      title: "XBOX / PC",
      items: [
        {
          label: "Grandmaster",
          href: "http://localhost:3000/produtos/?nmproduto=grandmaster",
        },
      ],
    },
    {
      title: "PS4 / PC",
      items: [
        {
          label: "Goliath",
          href: "http://localhost:3000/produtos/?nmproduto=goliath",
        },
      ],
    },
  ],
  [
    {
      title: "Instale você mesmo",
      items: [
        {
          label: "Kit Shape + Placa Remap + Paddles PG",
          href: "http://localhost:3000/produtos/?nmproduto=Kit Shape + Placa Remap + Paddles PG",
        },
        {
          label: "Kit Paddles PG",
          href: "http://localhost:3000/produtos/?nmproduto=Kit Paddles PG",
        },
        {
          label: "Placa PG Controle Arcade PS5 / PC",
          href: "http://localhost:3000/produtos/?nmproduto=Placa PG Controle Arcade PS5 / PC",
        },
      ],
    },
    {
      title: "PG Custom Trade-in",
      items: [
        {
          label: "Troque seu PG Antigo por um Novinho",
          href: "http://localhost:3000/produtos/?nmproduto=Troque seu PG Antigo Por um Novinho",
        },
      ],
    },
  ],
  [
    {
      title: "Acessórios e Peças",
      items: [
        {
          label: "Cases Custom",
          href: "http://localhost:3000/produtos/?nmproduto=Cases Custom",
        },
        {
          label: "Paddles",
          href: "http://localhost:3000/produtos/?nmproduto=Paddles",
        },
        {
          label: "Faceplates",
          href: "http://localhost:3000/produtos/?nmproduto=Faceplates",
        },
        {
          label: "Cartões de presente",
          href: "http://localhost:3000/produtos/?nmproduto=Cartões de presente",
        },
        {
          label: "Cabos",
          href: "http://localhost:3000/produtos/?nmproduto=Cabos",
        },
        {
          label: "Trigger PG Click Mouse",
          href: "http://localhost:3000/produtos/?nmproduto=Trigger PG Click Mouse",
        },
        {
          label: "Placa Remap Paddles",
          href: "http://localhost:3000/produtos/?nmproduto=Placa Remap Paddles",
        },
      ],
    },
  ],
];

const consoleColumns = [
  [
    {
      title: "PS5",
      items: [
        {
          label: "Shapes PS5 Painted",
          href: "http://localhost:3000/produtos/?nmproduto=Shapes PS5 Painted",
        },
      ],
    },
    {
      title: "XBOX",
      items: [
        {
          label: "Shapes XBOX Painted",
          href: "http://localhost:3000/produtos/?nmproduto=" + "Shapes XBOX Painted",
        },
      ],
    },
    {
      title: "Em estoque ( Todos )",
      items: [
        {
          label: "Shapes à pronta entrega",
          href: "http://localhost:3000/produtos/?nmproduto=" + "Shapes à pronta entrega",
        },
      ],
    },
  ],
  [
    {
      title: "Quer um shape com seu design?",
      items: [
        {
          label: "Entre em contato via Whatsapp",
          href: "https://wa.me/5521994391557" ,
        },
      ],
    },
  ],
];

const mouseColumns = [
  [
    {
      title: "Nossos Designs",
      items: [
        {
          label: "Mouses Painted",
          href: "http://localhost:3000/produtos/?nmproduto=" + "Mouses Painted",
        },
      ],
    },
    {
      title: "Em estoque ( Todos )",
      items: [
        {
          label: "Mouses à pronta entrega",
          href: "http://localhost:3000/produtos/?nmproduto=" + "Mouses à pronta entrega",
        },
      ],
    },
  ],
  [
    {
      title: "Quer um mouse com seu design?",
      items: [
        {
          label: "Entre em contato via Whatsapp",
          href: "https://wa.me/5521994391557" ,
        },
      ],
    },
  ],
];

const arcadeColumns = [
  [
    {
      title: "Arcade Bartop",
      items: [
        {
          label: "Bartops Customizados",
          href: "http://localhost:3000/produtos/?nmproduto=" + "Bartops Customizados",
        },
        {
          label: "À pronta entrega",
          href: "http://localhost:3000/produtos/?nmproduto=" + "à pronta entrega",
        },
      ],
    },
    {
      title: "Arcade Stick",
      items: [
        {
          label: "Arcade Sticks Customizados",
          href: "http://localhost:3000/produtos/?nmproduto=" + "Arcade Sticks Customizados",
        },
        {
          label: "À pronta entrega",
          href: "http://localhost:3000/produtos/?nmproduto=" + "À pronta entrega",
        },
      ],
    },
  ],
  [
    {
      title: "Quer um Arcade com seu Design?",
      items: [
        {
          label: "Entre em contato via Whatsapp",
          href: "https://wa.me/5521994391557" ,
        },
      ],
    },
  ],
];

const sobreColumns = [
  [
    {
      title: "Informações",
      items: [
        {
          label: "Sobre a empresa",
          href: "http://localhost:3000/sobre",
        },
        {
          label: "O Time PG",
          href: "http://localhost:3000/time-pg",
        },
        {
          label: "Avaliações",
          href: "http://localhost:3000/avaliacoes",
        },
      ],
    },
    {
      title: "Suporte",
      items: [
        {
          label: "Entre em contato",
          href: "https://wa.me/5521994391557",
        },
        {
          label: "Rastrear Pedidos",
          href: "https://rastreamento.correios.com.br/app/index.php",
        },
        {
          label: "FAQ's",
          href: "https://google.com",
        },
        {
          label: "Testar Controles",
          href: "https://hardwaretester.com/gamepad",
        },
        
      ],
    },
  ],
  [
    {
      title: "Games com PG",
      items: [
        {
          label: "Call of Duty + Warzone 2",
          href: "#" ,
        },
        {
          label: "Fortnite",
          href: "#" ,
        },
        {
          label: "Rocket League",
          href: "#" ,
        },
        {
          label: "Apex Legends",
          href: "#" ,
        },
        {
          label: "Rainbow Six Siege",
          href: "#" ,
        },
        {
          label: "FIFA 2K",
          href: "#" ,
        },
        {
          label: "GTA Online",
          href: "#" ,
        },
        {
          label: "Mortal Kombat",
          href: "#" ,
        },
        {
          label: "Street Fighters",
          href: "#" ,
        },
      ],
    },
  ],
  [
    {
      title: "Outros",
      items: [
        {
          label: "Termos de Uso",
          href: "#" ,
        },
        {
          label: "Garantias",
          href: "#" ,
        },
        {
          label: "Devoluções",
          href: "#" ,
        },
        {
          label: "Políticas de Privacidade",
          href: "#" ,
        },
        {
          label: "Manuais e instruções",
          href: "#" ,
        },
      ],
    },
  ],

];
