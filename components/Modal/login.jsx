import { useUser } from "@/hooks/user";
import { setCookie } from "@/lib/util/cookie";
import {
  At,
  CircleDashed,
  Key,
  UserCircle,
  Warning,
} from "@phosphor-icons/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button, Form, Input, Modal, Spin, Tag } from "antd";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";

import * as yup from "yup";

const Container = ({ children, ...props }) => <div {...props}>{children}</div>;

const FooterContainer = ({ children }) => (
  <div className="flex w-full items-center justify-end">{children}</div>
);

const FormContainer = ({ children }) => (
  <div className="flex w-full flex-col items-center gap-4">{children}</div>
);

export default function LoginModal({
  children,
  onOk,
  containerClassname,
  onCancel,
  okText,
  open,
  handleOpenRegister,
  ...props
}) {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const { substituirUsuario } = useUser();
  const formik = useFormik({
    initialValues: {
      email: "",
      senha: "",
      submitError: false,
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
      formik.setFieldValue("submitError", false);
      try {
        await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.senha,
        });

        const {
          error,
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          throw new Error(error);
        }

        setCookie("access_token", session.access_token, 1);
        setCookie("refresh_token", session.refresh_token, 1);

        const { user } = session;
        substituirUsuario({
          cdUsuario: user.id,
          nmEmail: user.email,
          nmTelefone: user.phone,
        });

        toast.success("Seja bem vindo!");
        onCancel();
      } catch (error) {
        toast.error("Login ou senha inválidos");
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
          <UserCircle size={64} />
          <span className="text-3xl font-bold text-slate-600">LOGIN</span>
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
            Login ou senha inválidos
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
          onClick={handleOpenRegister}
          className="text-sm font-semibold text-slate-600 hover:cursor-pointer hover:underline"
        >
          Não possui um cadastro ? Cadastre-se agora, clique aqui !
        </span>
      </Container>
    </Modal>
  );
}
