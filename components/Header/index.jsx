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
import {
  arcadeColumns,
  consoleColumns,
  controleColumns,
  mouseColumns,
  sobreColumns
} from "@/data/header-columns"

const Container = ({ children, ...props }) => <div {...props}>{children}</div>;

const LogoContainer = ({ children, ...props }) => (
  <div {...props}>{children}</div>
);

const InfoContainer = ({ children, ...props }) => (
  <div className={props?.className} {...props}>{children}</div>
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
        className="sticky top-0 z-40 flex items-center justify-between h-16 gap-4 w-screen max-w-full overflow-visible bg-black p-4 shadow-sm data-[ishome=false]:mb-8 data-[ishome=false]:bg-black max-md:data-[searchopen=true]:grid-cols-1 md:data-[ishome=true]:-mb-16"
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
            className="group pb-2 border-b border-b-transparent py-3 hover:cursor-pointer hover:border-b-focus-blue hover:text-focus-blue  data-[open=true]:border-b-focus-blue data-[open=true]:text-focus-blue"
          >
            Controles
            <SubHeader
              className="hidden cursor-auto group-hover:grid transition-all duration-100"
              mainColumnList={controleColumns}
            />
          </span>
          <span
            tabIndex={0}
            className="group pb-2 border-b border-b-transparent py-3 hover:cursor-pointer hover:border-b-focus-blue hover:text-focus-blue  data-[open=true]:border-b-focus-blue data-[open=true]:text-focus-blue"
          >
            Consoles
            <SubHeader
              className="hidden cursor-auto group-hover:grid"
              mainColumnList={consoleColumns}
            />
          </span>
          <span
            tabIndex={0}
            className="group pb-2 border-b border-b-transparent py-3 hover:cursor-pointer hover:border-b-focus-blue hover:text-focus-blue  data-[open=true]:border-b-focus-blue data-[open=true]:text-focus-blue"
          >
            Mouses
            <SubHeader
              className="hidden cursor-auto group-hover:grid"
              mainColumnList={mouseColumns}
            />
          </span>
          <span
            tabIndex={0}
            className="group pb-2 border-b border-b-transparent py-3 hover:cursor-pointer hover:border-b-focus-blue hover:text-focus-blue  data-[open=true]:border-b-focus-blue data-[open=true]:text-focus-blue"
          >
            Arcades
            <SubHeader
              className="hidden cursor-auto group-hover:grid"
              mainColumnList={arcadeColumns}
            />
          </span>
          <span
            tabIndex={0}
            className="group pb-2 border-b border-b-transparent py-3 hover:cursor-pointer hover:border-b-focus-blue hover:text-focus-blue  data-[open=true]:border-b-focus-blue data-[open=true]:text-focus-blue"
          >
            Sobre
            <SubHeader
              className="hidden cursor-auto group-hover:grid"
              mainColumnList={sobreColumns}
            />
          </span>
        </section>
        <InfoContainer
          data-searchopen={openSearch.open}
          className="flex max-md:w-full data-[searchopen=true]:w-full place-self-end self-center items-center justify-end gap-4"
        >
          <section
            // data-open={true}
            data-open={openSearch.open}
            className="relative -mr-2 flex w-full items-center justify-between gap-2 bg-black data-[open=false]:hidden"
          >
            <Input
              ref={searchRef}
              className="z-10 w-full rounded-full border-focus-blue bg-transparent px-4 py-1 text-sm font-normal text-white placeholder:text-focus-blue"
              placeholder="Pesquisar"
              value={getSearch}
              onChange={(e) => setSearch(e.target.value)}
              onBlur={openSearch.handleClose}
              onPressEnter={search}
              enterKeyHint="go"
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