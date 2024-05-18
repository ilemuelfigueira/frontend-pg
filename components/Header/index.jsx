"use client";

import { cookieRemove } from "@/actions/delete-cookie";
import LoginModal from "@/components/Modal/login";
import RegistrarModal from "@/components/Modal/registrar";
import { useOpen } from "@/hooks/open";
import { IconeNavbarSVG } from "@/public/home/icone-navbar";
import {
  AddressBook,
  List,
  MagnifyingGlass,
  Receipt,
  ShoppingCart,
  SignIn,
  SignOut,
  User,
  UserCircle,
} from "@phosphor-icons/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Dropdown, Input } from "antd";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

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
    // if (openSearch.open) searchRef.current && searchRef.current.focus();
  }, [openSearch.open]);

  const searchRef = useRef(null);

  const pathName = usePathname();

  return (
    <>
      <Container
        {...props}
        data-ishome={pathName == "/"}
        data-searchopen={openSearch.open}
        className="sticky top-0 z-40 grid max-md:data-[searchopen=true]:grid-cols-1 grid-cols-3 grid-rows-1 max-md:grid-cols-2 h-16 w-screen max-w-full overflow-hidden bg-black/90 p-4 shadow-sm data-[ishome=false]:mb-8 data-[ishome=false]:bg-black md:data-[ishome=true]:-mb-18"
      >
        <Link
          href={"/"}
          data-is-searchopen={openSearch.open}
          className="w-full items-center place-self-center cursor-pointer max-md:data-[is-searchopen=true]:hidden"
        >
          <LogoContainer className="flex w-full items-center gap-2 md:gap-4">
            <IconeNavbarSVG fill="white" className="aspect-square w-6 md:w-8" />
            <span className="w-full whitespace-nowrap text-base font-black text-white md:text-xl lg:text-2xl">
              PG Custom
            </span>
          </LogoContainer>
        </Link>
        <section
          // data-open={openSearch.open}
          className="flex place-self-center w-full justify-center items-center gap-6 text-white data-[open=true]:hidden max-md:hidden"
        >
          <Link
            href={`/produtos?nmprodutotipo=CONTROLE_EXCLUSIVO`}
            className="border-b border-b-transparent py-3 hover:cursor-pointer hover:border-b-focus-blue hover:text-focus-blue focus:border-b-focus-blue focus:text-focus-blue"
          >
            Controles
          </Link>
          <Link
            href={`/produtos?nmprodutotipo=CONSOLE`}
            className="border-b border-b-transparent py-3 hover:cursor-pointer hover:border-b-focus-blue hover:text-focus-blue focus:border-b-focus-blue focus:text-focus-blue"
          >
            Consoles
          </Link>
          <Link
            href={`/produtos?nmprodutotipo=MOUSE`}
            className="border-b border-b-transparent py-3 hover:cursor-pointer hover:border-b-focus-blue hover:text-focus-blue focus:border-b-focus-blue focus:text-focus-blue"
          >
            Mouses
          </Link>
          <Link
            href={`/produtos?nmprodutotipo=ARCADE`}
            className="border-b border-b-transparent py-3 hover:cursor-pointer hover:border-b-focus-blue hover:text-focus-blue focus:border-b-focus-blue focus:text-focus-blue"
          >
            Arcades
          </Link>
          <Link
            href={`/sobre`}
            className="border-b border-b-transparent py-3 hover:cursor-pointer hover:border-b-focus-blue hover:text-focus-blue focus:border-b-focus-blue focus:text-focus-blue"
          >
            Sobre
          </Link>
        </section>
        <InfoContainer
          data-is-searchopen={openSearch.open}
          className="flex w-full items-center justify-end gap-4 place-self-center"
        >
          <section
            data-open={openSearch.open}
            className="relative w-full bg-black/90 -mr-2 flex justify-between items-center gap-2 data-[open=false]:hidden"
          >
            <Input
              ref={searchRef}
              className="rounded-full z-10 w-full border-focus-blue bg-transparent px-4 py-1 text-sm font-normal text-white placeholder:text-focus-blue"
              placeholder="Pesquisar"
              value={getSearch}
              onChange={(e) => setSearch(e.target.value)}
              onBlur={openSearch.handleClose}
              onPressEnter={search}
            />
            <MagnifyingGlass
              onClick={() => router.push("/produtos?nmproduto=" + getSearch)}
              className="pointer-events-none absolute right-2 text-2xl aspect-square select-none fill-focus-blue"
            />
          </section>
          <MagnifyingGlass
            data-show={!openSearch.open}
            onClick={openSearch.openClose}
            className="text-2xl aspect-square shrink-0 cursor-pointer text-white data-[show=false]:hidden"
          />

          <ShoppingCart
            onClick={goToCart}
            className="text-2xl aspect-square shrink-0 cursor-pointer text-white hover:rounded-md"
          />
          {/* <If condition={existeUsuario}> */}
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
            {/* <a className="flex h-fit cursor-pointer items-center gap-1 text-slate-600 max-md:hidden">
                <UserCircle size={24} />
                <span className="text-xs">{user?.nome || user?.email}</span>
              </a> */}
            <User
              className="cursor-pointer text-2xl shrink-0 aspect-square text-white"
            />
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
