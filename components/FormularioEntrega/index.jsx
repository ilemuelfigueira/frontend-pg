"use client";

import { Button, Checkbox, DatePicker, Form, Input, Space } from "antd";
import { useFormularioEntrega } from "./index.hook";
import { PhoneInput } from "../PhoneInput";
import { CepInput } from "../CepInput";

const ItemContainer = ({ children }) => (
  <div className="md:flex md:gap-4">{children}</div>
);

const Container = ({ children }) => (
  <div className="flex w-full flex-col gap-4 bg-gray-200 max-lg:p-4 lg:rounded-xl lg:p-4 lg:shadow-lg">
    {children}
  </div>
);

export function FormularioEntrega() {
  const { formik, IsError, onFillCep, antdForm } = useFormularioEntrega();

  return (
    <Container>
      <span className="text-2xl font-bold">Formulário de Entrega</span>
      <Form
        form={antdForm}
        onFinish={formik.handleSubmit}
        scrollToFirstError
        layout="vertical"
      >
        <ItemContainer className="md:flex">
          <Form.Item
            label="Nome Completo *"
            name="nome"
            validateStatus={IsError("nome", "type")}
            help={IsError("nome", "message")}
            className="md:flex-[3]"
          >
            <Input size="large" type="text" onChange={formik.handleChange} />
          </Form.Item>
          <Form.Item
            label="Data de nascimento *"
            name="nascimento"
            validateStatus={IsError("nascimento", "type")}
            help={IsError("nascimento", "message")}
            className="md:flex-[1]"
          >
            <DatePicker
              size="large"
              placeholder="DD/MM/AAAA"
              format={["DD/MM/YYYY", "DD/MM/YY"]}
              onChange={(_, dateString) => {
                formik.setFieldValue("nascimento", dateString);
              }}
            />
          </Form.Item>
        </ItemContainer>

        <ItemContainer className="md:flex">
          <Form.Item
            label="Telefone *"
            name="telefone"
            validateStatus={IsError("telefone", "type")}
            help={IsError("telefone", "message")}
            className="md:flex-[1]"
          >
            <PhoneInput
              size="large"
              type="text"
              placeholder="(XX) XXXXX-XXXX"
              maxLength={15}
              onChange={formik.handleChange}
            />
          </Form.Item>
          <Form.Item
            label="Email *"
            name="email"
            validateStatus={IsError("email", "type")}
            help={IsError("email", "message")}
            className="md:flex-[3]"
          >
            <Input
              size="large"
              type="text"
              placeholder="enderecoemail@provedor.com"
              onChange={formik.handleChange}
            />
          </Form.Item>
        </ItemContainer>
        <ItemContainer className="md:flex">
          <Form.Item
            label="CEP *"
            name="cep"
            validateStatus={IsError("cep", "type")}
            help={IsError("cep", "message")}
            className="md:flex-[1]"
          >
            <CepInput
              size="large"
              type="text"
              placeholder="XXXXX-XXX"
              maxLength={9}
              onFill={onFillCep}
              onChange={formik.handleChange}
            />
          </Form.Item>

          <Form.Item
            label="Endereço *"
            name="endereco"
            validateStatus={IsError("endereco", "type")}
            help={IsError("endereco", "message")}
            className="md:flex-[3]"
          >
            <Input
              disabled={!IsError("cep", "type")}
              size="large"
              type="text"
              onChange={formik.handleChange}
            />
          </Form.Item>

          <Form.Item
            label="Nº"
            validateStatus={IsError("numero", "type")}
            help={IsError("numero", "message")}
            className="md:flex-[1]"
          >
            <Space size={1}>
              <Input
                size="large"
                type="number"
                name="numero"
                disabled={formik.values.semNumero}
                onChange={formik.handleChange}
              />
              <Checkbox
                checked={formik.values.semNumero}
                name="semNumero"
                onChange={formik.handleChange}
              >
                S/N
              </Checkbox>
            </Space>
          </Form.Item>
        </ItemContainer>

        <ItemContainer>
          <Form.Item
            label="Estado *"
            name="estado"
            validateStatus={IsError("estado", "type")}
            help={IsError("estado", "message")}
            className="md:flex-[1]"
          >
            <Input
              disabled={!IsError("cep", "type")}
              size="large"
              type="text"
              onChange={formik.handleChange}
            />
          </Form.Item>

          <Form.Item
            label="Município/Cidade *"
            name="cidade"
            validateStatus={IsError("cidade", "type")}
            help={IsError("cidade", "message")}
            className="md:flex-[1]"
          >
            <Input
              disabled={!IsError("cep", "type")}
              size="large"
              type="text"
              onChange={formik.handleChange}
            />
          </Form.Item>
        </ItemContainer>

        <Form.Item
          label="Complemento *"
          name="complemento"
          validateStatus={IsError("complemento", "type")}
          help={IsError("complemento", "message")}
        >
          <Input size="large" type="text" onChange={formik.handleChange} />
        </Form.Item>

        <Form.Item
          label="Observações"
          name="observacoes"
          validateStatus={IsError("observacoes", "type")}
          help={IsError("observacoes", "message")}
        >
          <Input.TextArea
            size="large"
            type="text"
            className="h-32 resize-none"
            placeholder="Ex: Não gosto do controle do jeito x, etc..."
            onChange={formik.handleChange}
          />
        </Form.Item>

        <Button type="primary" size="large" className="w-full hidden" htmlType="submit">
          <span className="font-black font-helvetica tracking-wider">Finalizar</span>
          <i className="pi pi-right-arrow" />
        </Button>
      </Form>
    </Container>
  );
}
