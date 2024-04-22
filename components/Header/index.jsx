"use client";

import { cookieRemove } from "@/actions/delete-cookie";
import LoginModal from "@/components/Modal/login";
import RegistrarModal from "@/components/Modal/registrar";
import { useOpen } from "@/hooks/open";
import { IconeNavbarSVG } from "@/public/home/icone-navbar";
import { LupaSVG } from "@/public/home/lupa";
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
  <div className="flex items-center gap-4">{children}</div>
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
    return await supabase.auth.signOut().then((res) => router.refresh());
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
      toast.error("Autentique-se novamente!");
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
        data-isHome={pathName == "/"}
        className="sticky top-0 z-40 flex h-14 w-screen max-w-full items-center justify-between gap-4 overflow-hidden bg-black/80 p-4 shadow-sm data-[isHome=false]:mb-8 data-[isHome=true]:-mb-16"
      >
        <Link href={"/"} className="w-fit cursor-pointer">
          <LogoContainer className="flex items-center gap-4">
            <IconeNavbarSVG fill="white" className="aspect-square w-6 md:w-8" />
            <span className="w-full text-lg font-black text-white md:text-2xl">
              PG Custom
            </span>
          </LogoContainer>
        </Link>
        <section
          data-open={openSearch.open}
          className="relative mx-auto flex w-full max-w-[700px] items-center gap-2 data-[open=false]:hidden"
        >
          <Input
            ref={searchRef}
            className="text-sm font-semibold text-slate-800 placeholder:text-slate-400"
            placeholder="Pesquisar nesta loja..."
            value={getSearch}
            onChange={(e) => setSearch(e.target.value)}
            onBlur={openSearch.handleClose}
            onPressEnter={search}
          />
          <MagnifyingGlass
            size={24}
            onClick={() => router.push("/produtos?nmproduto=" + getSearch)}
            className="pointer-events-none absolute right-2 mt-auto select-none"
          />
        </section>
        <section
          data-open={openSearch.open}
          className="relative flex gap-6 text-white data-[open=true]:hidden"
        >
          <Link
            href={`/produtos?nmprodutotipo=CONTROLE_EXCLUSIVO`}
            className="hover:text-focus-blue focus:text-focus-blue hover:border-b-focus-blue focus:border-b-focus-blue border-b py-2 hover:cursor-pointer"
          >
            Controles
          </Link>
          <Link
            href={`/produtos?nmprodutotipo=CONSOLE`}
            className="hover:text-focus-blue focus:text-focus-blue hover:border-b-focus-blue focus:border-b-focus-blue border-b py-2 hover:cursor-pointer"
          >
            Consoles
          </Link>
          <Link
            href={`/produtos?nmprodutotipo=MOUSE`}
            className="hover:text-focus-blue focus:text-focus-blue hover:border-b-focus-blue focus:border-b-focus-blue border-b py-2 hover:cursor-pointer"
          >
            Mouses
          </Link>
          <Link
            href={`/produtos?nmprodutotipo=ARCADE`}
            className="hover:text-focus-blue focus:text-focus-blue hover:border-b-focus-blue focus:border-b-focus-blue border-b py-2 hover:cursor-pointer"
          >
            Arcades
          </Link>
          <Link
            href={`/sobre`}
            className="hover:text-focus-blue focus:text-focus-blue hover:border-b-focus-blue focus:border-b-focus-blue border-b py-2 hover:cursor-pointer"
          >
            Sobre
          </Link>
        </section>
        <InfoContainer>
          <MagnifyingGlass
            onClick={openSearch.openClose}
            className={"cursor-pointer text-3xl text-white"}
          />

          <ShoppingCart
            onClick={goToCart}
            className="cursor-pointer text-3xl text-white hover:rounded-md"
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
            <User className="cursor-pointer text-3xl text-white hover:rounded-md" />
          </Dropdown>
          {/* </If> */}
          {/* <If condition={!existeUsuario}>
            <Button
              className="hidden items-center text-slate-600 md:flex"
              size="large"
              onClick={openLogin.handleOpen}
            >
              <span className="text-lg font-bold">Entrar</span>
            </Button>
          </If> */}

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

          <Dropdown
            className="md:hidden"
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
                      label: <MenuItem href="#" Icon={LupaSVG} />,
                    },
                    {
                      label: (
                        <MenuItem
                          href="#"
                          label={"Entrar"}
                          Icon={UserCircle}
                          onClick={openLogin.handleOpen}
                        />
                      ),
                    },
                  ],
            }}
            trigger={["click"]}
          >
            <Link href="#">
              <List className="text-4xl text-slate-900 lg:text-5xl" />
            </Link>
          </Dropdown>
        </InfoContainer>
      </Container>
    </>
  );
}
