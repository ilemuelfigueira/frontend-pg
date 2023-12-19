"use client";

import If from "@/components/If";
import Image from "@/components/Image";
import LoginModal from "@/components/Modal/login";
import RegistrarModal from "@/components/Modal/registrar";
import { useOpen } from "@/hooks/open";
import { useUser } from "@/hooks/user";
import {
  AddressBook,
  List,
  MagnifyingGlass,
  Receipt,
  ShoppingCart,
  SignOut,
  UserCircle,
} from "@phosphor-icons/react";
import { EyeClosed } from "@phosphor-icons/react/dist/ssr";
import { Button, Drawer, Dropdown, Input } from "antd";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Container = ({ children, ...props }) => (
  <div
    {...props}
    className="sticky top-0 z-40 mb-10 flex h-20 w-screen max-w-full items-center justify-between gap-4 overflow-hidden rounded-b-3xl bg-white px-4 shadow-lg data-[open=true]:min-h-screen"
  >
    {children}
  </div>
);

const LogoContainer = ({ children }) => (
  <div className="flex items-center gap-2">{children}</div>
);

const InfoContainer = ({ children, ...props }) => (
  <div className="flex items-center gap-4">{children}</div>
);

const obsidianUrl =
  "/exclusivos/obsidian?shape=38e17418-703f-4620-90af-14742adea114&paddles=450ea66e-ff61-45fd-8b16-b129b12aea2d&paddlesClick=6a1149cc-a091-45c7-8bc1-d7b41f9c4ebe&paddlesColor=29f43501-db68-4ac7-ad59-15b45f819be7&trigger=ea661451-0a41-497d-8d7f-456790f9ac47&grip=a6f00944-26b7-41f6-bab6-0c7790de82e8&faceplateGrip=0e7b1b79-0cbf-4f0d-ac68-1f2a1263daa1&vibration=695989a7-7521-4ac7-a8c9-2e499e81d631&";

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

  const pathName = usePathname();

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
            className="aspect-square w-14 md:w-20"
          />
          <span className="flex gap-2 font-semibold text-slate-600 max-lg:text-sm lg:text-2xl">
            <span>PGCUSTOM</span>
            <span className="font-normal">|</span>
            <span className="font-normal">STORE</span>
          </span>
        </LogoContainer>
        <div
          className="hidden w-full max-w-[700px] items-center gap-2"
        >
          <Input
            className="h-12"
            placeholder="Pesquisar nesta loja..."
            value={getSearch}
            onChange={(e) => setSearch(e.target.value)}
            onPressEnter={() => router.push("/produtos?nmproduto=" + getSearch)}
          />
          <MagnifyingGlass
            size={24}
            onClick={() => router.push("/produtos?nmproduto=" + getSearch)}
          />
        </div>
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
              <a className="flex h-fit cursor-pointer items-center gap-2 text-slate-600 max-md:hidden">
                <UserCircle size={40} />
                <span>{user.nmUsuario || user.nmEmail}</span>
              </a>
            </Dropdown>
          </If>
          <If condition={!existeUsuario}>
            <Button
              className="hidden items-center text-slate-600 md:flex"
              size="large"
              onClick={openLogin.handleOpen}
              icon={<i className="pi pi-user text-xl lg:text-2xl" />}
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
