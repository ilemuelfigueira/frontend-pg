"use client";

import If from "@/components/If";
import Image from "@/components/Image";
import LoginModal from "@/components/Modal/login";
import RegistrarModal from "@/components/Modal/registrar";
import { useOpen } from "@/hooks/open";
import { useUser } from "@/hooks/user";
import { ShoppingCart, UserCircle } from "@phosphor-icons/react";
import { Badge, Button, Dropdown } from "antd";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const Container = ({ children }) => (
  <div className="flex w-screen max-w-full justify-between max-lg:w-[100vw] lg:w-[90vw] xl:w-[1200px] 2xl:w-[1400px]">
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

export function HeaderNavigator({ ...props }) {
  const { existe: existeUsuario, user, sair } = useUser();

  const searchParams = useSearchParams();

  const openRegister = useOpen({
    defaultValue: searchParams.get("register") == "true",
  });
  const openLogin = useOpen({
    defaultValue: searchParams.get("login") == "true",
  });
  const openCart = useOpen();

  const closeLoginOpenRegister = () => {
    openLogin.handleClose();
    openRegister.handleOpen();
  };

  return (
    <Container {...props}>
      <LogoContainer>
        <Image
          href={`/`}
          priority
          src={
            process.env.NEXT_PUBLIC_STORAGE_PRODUTOS +
            "/produtos/png/logo/logo-192x192.png"
          }
          className="aspect-square w-16"
        />
        <span className="text-2xl font-semibold text-slate-600">
          PGCUSTOM <span className="font-normal">|</span>{" "}
          <span className="font-normal">STORE</span>
        </span>
      </LogoContainer>
      <InfoContainer>
        <If condition={existeUsuario}>
          <Dropdown
            menu={{
              items: [
                {
                  label: (
                    <a href="#" onClick={sair}>
                      Sair
                    </a>
                  ),
                  key: "Sair",
                },
                {
                  label: <Link href={obsidianUrl}>Obsidian</Link>,
                  key: "Obsidian",
                },
              ],
            }}
            trigger={["click"]}
          >
            <a className="flex h-fit items-center gap-2 text-slate-600">
              <UserCircle size={40} />
              <span className="max-md:hidden">
                {user.nmUsuario || user.nmEmail}
              </span>
            </a>
          </Dropdown>
        </If>
        <If condition={!existeUsuario}>
          <Button
            className="text-slate-600"
            size="large"
            onClick={openLogin.handleOpen}
            icon={<i className="pi pi-user" />}
          >
            <span className="text-lg font-bold">Fazer Login</span>
          </Button>
        </If>
        <Badge count={5} showZero>
          <Link href={"/carrinho"}>
            <ShoppingCart
              className="cursor-pointer text-slate-600 hover:rounded-md"
              onClick={openCart.handleOpen}
              size={32}
            />
          </Link>
        </Badge>
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
  );
}
