"use client";

import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Popconfirm,
  Space,
} from "antd";
import { useFormularioEntrega } from "./index.hook";
import { PhoneInput } from "../PhoneInput";
import { CepInput } from "../CepInput";
import { Envelope } from "@phosphor-icons/react";

const ItemContainer = ({ children }) => (
  <div className="md:flex md:gap-4">{children}</div>
);

const Container = ({ children }) => (
  <div className="flex w-full flex-col gap-4 max-lg:p-4 lg:rounded-xl lg:bg-white lg:p-4 lg:shadow-lg">
    {children}
  </div>
);

export function FormularioEntrega() {
  const { formik, IsError, onFillCep, antdForm, dayjsParse } =
    useFormularioEntrega();

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
            name="nmresponsavel"
            validateStatus={IsError("nmresponsavel", "type")}
            help={IsError("nmresponsavel", "message")}
            initialValue={formik.values.nmresponsavel}
            className="md:flex-[3]"
          >
            <Input size="large" type="text" onChange={formik.handleChange} />
          </Form.Item>
          <Form.Item
            label="Data de nascimento *"
            name="dtnascimento"
            validateStatus={IsError("dtnascimento", "type")}
            help={IsError("dtnascimento", "message")}
            initialValue={
              formik.values.dtnascimento
                ? dayjsParse(formik.values.dtnascimento)
                : undefined
            }
            className="md:flex-[1]"
          >
            <DatePicker
              size="large"
              placeholder="DD/MM/AAAA"
              format={["DD/MM/YYYY", "DD/MM/YY"]}
              onChange={(_, dateString) => {
                formik.setFieldValue("dtnascimento", dateString);
              }}
            />
          </Form.Item>
        </ItemContainer>

        <ItemContainer className="md:flex">
          <Form.Item
            label="Telefone *"
            name="nutelefone"
            validateStatus={IsError("nutelefone", "type")}
            help={IsError("nutelefone", "message")}
            initialValue={formik.values.nutelefone}
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
            name="nmemail"
            validateStatus={IsError("nmemail", "type")}
            help={IsError("nmemail", "message")}
            initialValue={formik.values.nmemail}
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
            name="nucep"
            validateStatus={IsError("nucep", "type")}
            help={IsError("nucep", "message")}
            initialValue={formik.values.nucep}
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
            name="nmendereco"
            validateStatus={IsError("nmendereco", "type")}
            help={IsError("nmendereco", "message")}
            initialValue={formik.values.nmendereco}
            className="md:flex-[3]"
          >
            <Input
              disabled={!IsError("nucep", "type")}
              size="large"
              type="text"
              onChange={formik.handleChange}
            />
          </Form.Item>

          <Form.Item
            label="Nº"
            validateStatus={IsError("nuendereco", "type")}
            help={IsError("nuendereco", "message")}
            initialValue={formik.values.nuendereco}
            className="md:flex-[1]"
          >
            <Space size={1}>
              <Input
                size="large"
                type="number"
                name="nuendereco"
                defaultValue={formik.values.nuendereco}
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
            name="nmestado"
            validateStatus={IsError("nmestado", "type")}
            help={IsError("nmestado", "message")}
            initialValue={formik.values.nmestado}
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
            name="nmcidade"
            validateStatus={IsError("nmcidade", "type")}
            help={IsError("nmcidade", "message")}
            initialValue={formik.values.nmcidade}
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
          name="nmcomplemento"
          validateStatus={IsError("nmcomplemento", "type")}
          help={IsError("nmcomplemento", "message")}
          initialValue={formik.values.nmcomplemento}
        >
          <Input size="large" type="text" onChange={formik.handleChange} />
        </Form.Item>

        <Form.Item
          label="Observações"
          name="deobservacoes"
          validateStatus={IsError("deobservacoes", "type")}
          help={IsError("deobservacoes", "message")}
          initialValue={formik.values.deobservacoes}
        >
          <Input.TextArea
            size="large"
            type="text"
            className="h-32 resize-none"
            placeholder="Rua próxima ao mercado, casa com portão azul, etc."
            onChange={formik.handleChange}
          />
        </Form.Item>

        <Popconfirm
          title="Finalizar o pedido"
          description="Tem certeza que quer finalizar o pedido?"
          onConfirm={formik.handleSubmit}
          okText="Sim"
          cancelText="Não"
        >
          <Button
            type="primary"
            size="large"
            className="flex w-full max-w-[400px] mx-auto items-center justify-center"
            icon={<Envelope size={24} />}
            loading={formik.isSubmitting}
          >
            <span className="font-black uppercase tracking-wider">
              Finalizar
            </span>
          </Button>
        </Popconfirm>
      </Form>
    </Container>
  );
}
