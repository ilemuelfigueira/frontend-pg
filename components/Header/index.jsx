"use client";

import If from "@/components/If";
import Image from "@/components/Image";
import LoginModal from "@/components/Modal/login";
import RegistrarModal from "@/components/Modal/registrar";
import { useOpen } from "@/hooks/open";
import useFcmToken from "@/hooks/useFcmToken";
import { useUser } from "@/hooks/user";
import firebaseApp from "@/lib/util/firebase";
import {
  AddressBook,
  List,
  MagnifyingGlass,
  Receipt,
  ShoppingCart,
  SignOut,
  UserCircle,
} from "@phosphor-icons/react";
import { Button, Dropdown, Input } from "antd";
import { getMessaging, onMessage } from "firebase/messaging";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Container = ({ children, ...props }) => (
  <div
    {...props}
    className="sticky top-0 z-40 flex h-20 w-screen max-w-full items-center justify-between gap-4 overflow-hidden bg-white px-4 shadow-sm data-[open=true]:min-h-screen"
  >
    {children}
  </div>
);

const LogoContainer = ({ children }) => (
  <div className="flex items-center gap-1">{children}</div>
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

export function HeaderNavigator({ ...props }) {
  const { existe: existeUsuario, user, sair } = useUser();

  const searchParams = useSearchParams();
  const router = useRouter();

  const [getSearch, setSearch] = useState(searchParams.get("search") || "");

  const openRegister = useOpen({
    defaultValue: searchParams.get("register") == "true",
  });
  const openLogin = useOpen({
    defaultValue: searchParams.get("login") == "true",
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

    router.push(href);
  };

  return (
    <>
      <Container {...props}>
        <LogoContainer>
          <Image
            href={`/`}
            priority
            src={
              process.env.NEXT_PUBLIC_STORAGE_PRODUTOS +
              "/produtos/png/logo/logo-192x192.png"
            }
            className="aspect-square w-10 md:w-12"
          />
          <span className="flex gap-1 text-sm font-semibold text-slate-600 lg:text-lg">
            <span>PGCUSTOM</span>
            <span className="font-normal">|</span>
            <span className="font-normal">STORE</span>
          </span>
        </LogoContainer>
        <section className="w-full">
          <div className="relative mx-auto flex w-full max-w-[700px] items-center gap-2">
            <Input
              className="h-10"
              placeholder="Pesquisar nesta loja..."
              value={getSearch}
              onChange={(e) => setSearch(e.target.value)}
              onPressEnter={search}
            />
            <MagnifyingGlass
              size={24}
              onClick={() => router.push("/produtos?nmproduto=" + getSearch)}
              className="pointer-events-none absolute right-2 mt-auto select-none"
            />
          </div>
        </section>
        <InfoContainer>
          <If condition={existeUsuario}>
            <Dropdown
              menu={{
                items: [
                  {
                    label: (
                      <MenuItem
                        href="/enderecos"
                        label="Endereços"
                        Icon={AddressBook}
                      />
                    ),
                  },
                  // {
                  //   label: (
                  //     <MenuItem
                  //       href="/pedidos"
                  //       label="Pedidos"
                  //       Icon={Receipt}
                  //     />
                  //   ),
                  //   key: "Pedidos",
                  // },
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
                ],
              }}
              trigger={["click"]}
            >
              <a className="flex h-fit cursor-pointer items-center gap-1 text-slate-600 max-md:hidden">
                <UserCircle size={24} />
                <span className="text-xs">
                  {user.nmUsuario || user.nmEmail}
                </span>
              </a>
            </Dropdown>
          </If>
          <If condition={!existeUsuario}>
            <Button
              className="hidden items-center text-slate-600 md:flex"
              size="large"
              onClick={openLogin.handleOpen}
            >
              <span className="text-lg font-bold">Entrar</span>
            </Button>
          </If>

          <ShoppingCart
            onClick={goToCart}
            className="cursor-pointer text-3xl text-slate-600 hover:rounded-md lg:text-4xl"
          />

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
