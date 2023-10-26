"use client";

import Image from "@/components/Image";
import { At, Key } from "@phosphor-icons/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button, Form, Input, Tabs, message } from "antd";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";

import * as yup from "yup";

function Registrar() {
  const formik = useFormik({
    initialValues: {
      email: "",
      senha: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Digite um email válido")
        .required("Campo obrigatório"),
      senha: yup
        .string()
        .min(5, "Digite pelo menos 5 caracteres")
        .required("Campo obrigatório"),
    }),
    onSubmit: async (values) => {
      await supabase.auth.signUp({
        email: values.email,
        password: values.senha,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      });

      message.info("Verifique sua caixa de email, para confirmar seu acesso.");
      router.refresh();
    },
  });
  const router = useRouter();
  const supabase = createClientComponentClient();

  function IsError(key, returnType = "boolean") {
    const condition = formik.touched[key] && formik.errors[key];

    if (!condition) return;

    switch (returnType) {
      case "boolean":
        return condition;
      case "message":
        return condition ? formik.errors[key] : "";
      case "type":
        return condition ? "error" : "";
      default:
        return condition;
    }
  }

  const [antdForm] = Form.useForm();

  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <Form
          className="w-full"
          form={antdForm}
          onFinish={formik.handleSubmit}
          scrollToFirstError
          layout="vertical"
          size="small"
        >
          <div className="flex w-full flex-col items-center gap-4">
            <Form.Item
              label="Email"
              name="email"
              validateStatus={IsError("email", "type")}
              help={IsError("email", "message")}
              className="m-0 w-full"
            >
              <Input
                size="large"
                placeholder="Digite um email"
                prefix={<At size={24} />}
                type="text"
                onChange={formik.handleChange}
              />
            </Form.Item>

            <Form.Item
              label="Senha"
              name="senha"
              validateStatus={IsError("senha", "type")}
              help={IsError("senha", "message")}
              className="m-0 w-full"
            >
              <Input.Password
                size="large"
                placeholder="Digite uma senha"
                prefix={<Key size={24} />}
                type="text"
                onChange={formik.handleChange}
              />
            </Form.Item>
          </div>
        </Form>

        <div className="flex w-full flex-col items-center justify-start gap-1">
          <Button
            type="primary"
            size="large"
            className="w-full font-bold tracking-wide"
            onClick={formik.handleSubmit}
          >
            Registrar
          </Button>
        </div>
      </div>
    </>
  );
}
function Entrar() {
  const formik = useFormik({
    initialValues: {
      email: "",
      senha: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Digite um email válido")
        .required("Campo obrigatório"),
      senha: yup
        .string()
        .min(5, "Digite pelo menos 5 caracteres")
        .required("Campo obrigatório"),
    }),
    onSubmit: async (values) => {
      await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.senha,
      });

      const { error } = await supabase.auth.getUser();

      try {
        if (error) {
          throw new Error(error.message);
        }

        message.success("Seja bem vindo!");
        router.refresh();
      } catch (error) {
        message.error("Login ou senha inválidos");
      }
    },
  });
  const router = useRouter();
  const supabase = createClientComponentClient();

  function IsError(key, returnType = "boolean") {
    const condition = formik.touched[key] && formik.errors[key];

    if (!condition) return;

    switch (returnType) {
      case "boolean":
        return condition;
      case "message":
        return condition ? formik.errors[key] : "";
      case "type":
        return condition ? "error" : "";
      default:
        return condition;
    }
  }

  const [antdForm] = Form.useForm();

  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <Form
          className="w-full"
          form={antdForm}
          onFinish={formik.handleSubmit}
          scrollToFirstError
          layout="vertical"
          size="small"
        >
          <div className="flex w-full flex-col items-center gap-4">
            <Form.Item
              label="Email"
              name="email"
              validateStatus={IsError("email", "type")}
              help={IsError("email", "message")}
              className="m-0 w-full"
            >
              <Input
                size="large"
                placeholder="Digite um email"
                prefix={<At size={24} />}
                type="text"
                onChange={formik.handleChange}
              />
            </Form.Item>

            <Form.Item
              label="Senha"
              name="senha"
              validateStatus={IsError("senha", "type")}
              help={IsError("senha", "message")}
              className="m-0 w-full"
            >
              <Input.Password
                size="large"
                placeholder="Digite uma senha"
                prefix={<Key size={24} />}
                type="text"
                onChange={formik.handleChange}
              />
            </Form.Item>
          </div>
        </Form>

        <div className="flex w-full flex-col items-center justify-start gap-1">
          <Button
            type="primary"
            size="large"
            className="w-full font-bold tracking-wide"
            onClick={formik.handleSubmit}
          >
            Entrar
          </Button>
        </div>
      </div>
    </>
  );
}

export default function LoginPage() {
  return (
    <div className="relative flex h-screen w-screen rounded-md bg-slate-100 shadow-md">
      <div className="absolute gap-8 left-1/2 top-1/2 flex w-full max-w-[600px] -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-lg bg-white px-4 py-8 max-lg:w-screen max-lg:justify-center">
        <Image
          src={`https://ljgdfxvbwvrxsltyjutg.supabase.co/storage/v1/object/public/produtos/png/logo/logo-192x192.png`}
          className="aspect-square max-sm:w-28 w-36"
        />
        <Tabs
          className="w-full"
          items={[
            {
              key: "1",
              label: "Entrar",
              children: <Entrar />,
            },
            {
              key: "2",
              label: "Registrar",
              children: <Registrar />,
            },
          ]}
        />
      </div>
    </div>
  );
}
