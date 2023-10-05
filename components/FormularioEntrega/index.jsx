"use client";

import { Button, Checkbox, DatePicker, Form, Input, Space } from "antd";
import { useFormularioEntrega } from "./index.hook";
import { aplicarMascara } from "@/lib/util";
import { PhoneInput } from "../PhoneInput";
import { CepInput } from "../CepInput";

export function FormularioEntrega() {
  const { formik, IsError } = useFormularioEntrega();

  return (
    <>
      <Form onFinish={formik.handleSubmit} scrollToFirstError layout="vertical">
        <Form.Item
          label="Nome Completo *"
          name="nome"
          validateStatus={IsError("nome", "type")}
          help={IsError("nome", "message")}
        >
          <Input type="text" onChange={formik.handleChange} />
        </Form.Item>

        <Form.Item
          label="Email *"
          name="email"
          validateStatus={IsError("email", "type")}
          help={IsError("email", "message")}
        >
          <Input
            type="text"
            placeholder="enderecoemail@provedor.com"
            onChange={formik.handleChange}
          />
        </Form.Item>

        <Form.Item
          label="Telefone *"
          name="telefone"
          validateStatus={IsError("telefone", "type")}
          help={IsError("telefone", "message")}
        >
          <PhoneInput
            type="text"
            placeholder="(XX) XXXXX-XXXX"
            maxLength={15}
            onChange={formik.handleChange}
          />
        </Form.Item>

        <Form.Item
          label="Data de nascimento *"
          name="nascimento"
          validateStatus={IsError("nascimento", "type")}
          help={IsError("nascimento", "message")}
        >
          <DatePicker
            placeholder="DD/MM/AAAA"
            format={["DD/MM/YYYY", "DD/MM/YY"]}
            onChange={(_, dateString) => {
              formik.setFieldValue("nascimento", dateString);
            }}
          />
        </Form.Item>

        <Form.Item
          label="CEP *"
          name="cep"
          validateStatus={IsError("cep", "type")}
          help={IsError("cep", "message")}
        >
          <CepInput
            type="text"
            placeholder="XXXXX-XXX"
            maxLength={9}
            onChange={formik.handleChange}
          />
        </Form.Item>

        <Form.Item
          label="Endereço *"
          name="endereco"
          validateStatus={IsError("endereco", "type")}
          help={IsError("endereco", "message")}
        >
          <Input type="text" onChange={formik.handleChange} />
        </Form.Item>

        <Form.Item
          label="Nº"
          validateStatus={IsError("numero", "type")}
          help={IsError("numero", "message")}
        >
          <Space>
            <Input
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
              Sem número
            </Checkbox>
          </Space>
        </Form.Item>

        <Form.Item
          label="Estado *"
          name="estado"
          validateStatus={IsError("estado", "type")}
          help={IsError("estado", "message")}
        >
          <Input type="text" onChange={formik.handleChange} />
        </Form.Item>

        <Form.Item
          label="Município/Cidade *"
          name="cidade"
          validateStatus={IsError("cidade", "type")}
          help={IsError("cidade", "message")}
        >
          <Input type="text" onChange={formik.handleChange} />
        </Form.Item>

        <Form.Item
          label="Observações"
          name="observacoes"
          validateStatus={IsError("observacoes", "type")}
          help={IsError("observacoes", "message")}
        >
          <Input.TextArea type="text" onChange={formik.handleChange} />
        </Form.Item>

        <Button type="primary" size="large" htmlType="submit">
          Finalizar
        </Button>
      </Form>
    </>
  );
}
