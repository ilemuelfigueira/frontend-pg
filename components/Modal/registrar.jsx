import {
  At,
  CircleDashed,
  Key,
  PencilCircle,
  Warning,
} from "@phosphor-icons/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button, Form, Input, Modal, Spin, Tag } from "antd";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

import * as yup from "yup";

const Container = ({ children, ...props }) => <div {...props}>{children}</div>;

const FooterContainer = ({ children }) => (
  <div className="flex w-full items-center justify-end">{children}</div>
);

const FormContainer = ({ children }) => (
  <div className="flex w-full flex-col items-center gap-4">{children}</div>
);

export default function RegistrarModal({
  children,
  onOk,
  containerClassname,
  onCancel,
  okText,
  open,
  ...props
}) {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const formik = useFormik({
    initialValues: {
      nome: "",
      email: "",
      telefone: "",
      senha: "",
      submitError: false,
    },
    validationSchema: yup.object({
      nome: yup
        .string()
        .min(3, "Digite pelo menos 3 caracteres")
        .max(40, "Valor inserido muito grande")
        .required("Campo obrigatório"),
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
      formik.setFieldValue("submitError", false);
      try {
        await supabase.auth.signUp({
          email: values.email,
          password: values.senha,
          options: {
            emailRedirectTo: `${location.origin}/api/auth/callback`,
          },
        });
  
        onCancel();
        toast("Verifique sua caixa de email, para confirmar seu acesso.");
        router.push("/login");
      } catch (error) {
        console.error(error.message);
        toast.error("Tente novamente mais tarde.");
        formik.setFieldValue("submitError", true);
      }
    },
  });

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
    <Modal
      title={
        <div className="flex w-full items-center justify-center gap-2">
          <PencilCircle size={64} />
          <span className="font-bold text-slate-600 text-3xl">CADASTRO</span>
        </div>
      }
      centered
      onOk={formik.handleSubmit}
      onCancel={onCancel}
      okText={okText}
      open={open}
      className="w-[700px]"
      footer={(_, __) => (
        <FooterContainer>
          <Button
            className="w-full hover:bg-white hover:text-red-500"
            type="text"
            onClick={onCancel}
          >
            Voltar
          </Button>
          <Button
            onClick={formik.handleSubmit}
            className="w-full"
            type="primary"
          >
            <Spin spinning={formik.isSubmitting} />
            {okText}
          </Button>
        </FooterContainer>
      )}
      {...props}
    >
      <Container
        className={twMerge(
          "my-8 flex flex-col items-start gap-4",
          containerClassname,
        )}
      >
        {formik.values.submitError && (
          <Tag
            className="flex w-full items-center justify-center gap-2 text-lg"
            icon={<Warning size={32} />}
            color="error"
          >
            Erro ao enviar o formulário, <br />verifique os dados inseridos ou tente novamente mais tarde.
          </Tag>
        )}
        {formik.isSubmitting && (
          <Tag
            className="flex w-full items-center justify-center gap-2 text-lg"
            icon={
              <CircleDashed
                data-spin={formik.isSubmitting}
                className="data-[spin=true]:animate-spin"
                size={32}
              />
            }
            color="processing"
          >
            Processando
          </Tag>
        )}
        <Form
          className="w-full"
          form={antdForm}
          onFinish={formik.handleSubmit}
          scrollToFirstError
          layout="vertical"
          size="small"
        >
          <FormContainer className="flex w-full flex-col items-center gap-4">
            <Form.Item
              label="Nome Completo"
              name="nome"
              validateStatus={IsError("nome", "type")}
              help={IsError("nome", "message")}
              className="m-0 w-full"
            >
              <Input
                size="large"
                max={40}
                placeholder="Digite um email"
                prefix={<At size={24} />}
                type="text"
                onChange={formik.handleChange}
              />
            </Form.Item>

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
                onPressEnter={formik.handleSubmit}
                onChange={formik.handleChange}
              />
            </Form.Item>
          </FormContainer>
        </Form>
        <span
          className="text-sm font-semibold text-slate-600 hover:cursor-pointer hover:underline"
        >
          Após o cadastro, verifique a caixa de spam, caso não encontre o email com o acesso.
        </span>
      </Container>
    </Modal>
  );
}
