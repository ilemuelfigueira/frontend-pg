import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

const baseUrl = process.env.STORAGE_PRODUTOS
  ? `https://${process.env.STORAGE_PRODUTOS}`
  : "https://ljgdfxvbwvrxsltyjutg.supabase.co/storage/v1/object/public/produtos";

export const Email = (props = {}) => {
  const {
    cdPedido = "1ZV218970300071628",
    nmCliente = "Lemuel Figueira",
    nmTelefone = "(21) 96821-9784",
    nmCEP = "86082-701",
    nmEndereco = "Rua Luiz Vieira Sagrilo, 55",
    nmCidade = "Londrina",
    nmEstado = "Paraná",
    nmComplemento = "BLOCO 3, APT 105",
    nmEmail = "lfigueiradev@gmail.com",
    nmTotal = "749,94",
    produtos = [
      {
        title: "PG SPEAKEASY PS5",
        avatar: "/png/dualshock4/vermelho/1.png",
        href: "https://pgcustomstore.com.br/exclusivos/obsidian?shape=roxo&paddles=4paddles&paddlesClick=digital&paddlesColor=vermelho&trigger=mouse&grip=militar&faceplateGrip=sem&vibration=com_vibracao&",
        items: [
          {
            label: "PADDLES (2 Paddles slim)",
            value: "99,99",
          },
          {
            label: "COR PADDLES (VERMELHO)",
            value: "00,00",
          },
          {
            label: "CLICK PADDLES (TACTIL)",
            value: "74,99",
          },
          {
            label: "TRIGGER (PADRAO)",
            value: "00,00",
          },
          {
            label: "GRIP (EXCLUSIVE)",
            value: "199,99",
          },
        ],
      },
      {
        title: "PG GOLIATH PS4",
        avatar: "/png/dualshock4/vermelho/1.png",
        href: "https://pgcustomstore.com.br/exclusivos/obsidian?shape=roxo&paddles=4paddles&paddlesClick=digital&paddlesColor=vermelho&trigger=mouse&grip=militar&faceplateGrip=sem&vibration=com_vibracao&",
        items: [
          {
            label: "PADDLES (2 Paddles fat)",
            value: "99,99",
          },
          {
            label: "COR PADDLES (VERMELHO)",
            value: "00,00",
          },
          {
            label: "CLICK PADDLES (TACTIL)",
            value: "74,99",
          },
          {
            label: "TRIGGER (PADRAO)",
            value: "00,00",
          },
          {
            label: "GRIP (EXCLUSIVE)",
            value: "199,99",
          },
        ],
      },
    ],
  } = props;

  return (
    <Html>
      <Head />
      <Preview>UHUUU!!, mais um pedido foi realizado.</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={receipt.container}>
            <Row>
              <Column align="center">
                <Text style={global.heading}>Código</Text>
                <Text style={receipt.id}>{cdPedido}</Text>
              </Column>
            </Row>
          </Section>
          <Hr style={global.hr} />
          <Section style={message}>
            <Img
              src={`${baseUrl}/png/logo/logo-192x192.png`}
              width="70"
              height="70"
              alt="PGCUSTOMCONTROLES"
              style={{ margin: "auto" }}
            />
            <Heading style={global.heading}>Pedido Realizado</Heading>
            <Row>
              <Column align="left">
                <Text style={receipt.info.label}>Cliente:</Text>
              </Column>
              <Column align="right">
                <Text style={receipt.info.value}>{nmCliente}</Text>
              </Column>
            </Row>
            <Row>
              <Column align="left">
                <Text style={receipt.info.label}>Telefone:</Text>
              </Column>
              <Column align="right">
                <Text style={receipt.info.value}>{nmTelefone}</Text>
              </Column>
            </Row>
            <Row>
              <Column align="left">
                <Text style={receipt.info.label}>CEP:</Text>
              </Column>
              <Column align="right">
                <Text style={receipt.info.value}>{nmCEP}</Text>
              </Column>
            </Row>
            <Row>
              <Column align="left">
                <Text style={receipt.info.label}>Endereço:</Text>
              </Column>
              <Column align="right">
                <Text style={receipt.info.value}>{nmEndereco}</Text>
              </Column>
            </Row>
            <Row>
              <Column align="left">
                <Text style={receipt.info.label}>Cidade:</Text>
              </Column>
              <Column align="right">
                <Text style={receipt.info.value}>{nmCidade}</Text>
              </Column>
            </Row>
            <Row>
              <Column align="left">
                <Text style={receipt.info.label}>Estado:</Text>
              </Column>
              <Column align="right">
                <Text style={receipt.info.value}>{nmEstado}</Text>
              </Column>
            </Row>
            <Row>
              <Column align="left">
                <Text style={receipt.info.label}>Complemento:</Text>
              </Column>
              <Column align="right">
                <Text style={receipt.info.value}>{nmComplemento}</Text>
              </Column>
            </Row>
            <Row>
              <Column align="left">
                <Text style={receipt.info.label}>Email:</Text>
              </Column>
              <Column align="right">
                <Text style={receipt.info.value}>{nmEmail}</Text>
              </Column>
            </Row>
          </Section>
          <Hr style={global.hr} />
          {produtos.map((produto, indexProdutos) => (
            <React.Fragment key={produto.title}>
              <Section style={global.defaultPadding}>
                <Link href={produto.href}>
                  <Img
                    src={`${baseUrl}${produto.avatar}`}
                    width="70"
                    height="70"
                    alt="PGCUSTOMCONTROLES"
                    style={{ margin: "auto" }}
                  />
                </Link>
                <Column
                  style={{
                    paddingLeft: "20px",
                  }}
                >
                  <Text style={adressTitle}>{produto.title}</Text>
                  {produto.items.map((item) => (
                    <Row key={item.label} align="left">
                      <Column align="left">
                        <Text style={receipt.product.label}>{item.label}</Text>
                      </Column>
                      <Column align="right">
                        <Text style={receipt.product.value}>{item.value}</Text>
                      </Column>
                    </Row>
                  ))}
                </Column>
              </Section>
              {indexProdutos < produtos.length && <Hr style={global.hr} />}
            </React.Fragment>
          ))}
          <Section
            style={{ ...paddingX, paddingTop: "40px", paddingBottom: "40px" }}
          >
            <Row>
              <Column align="left">
                <Text style={receipt.total.label}>TOTAL:</Text>
              </Column>
              <Column align="right">
                <Text style={receipt.total.value}>R$ {nmTotal}</Text>
              </Column>
            </Row>
          </Section>
          <Hr style={global.hr} />
        </Container>
      </Body>
    </Html>
  );
};

export default Email;

const paddingX = {
  paddingLeft: "40px",
  paddingRight: "40px",
};

const paddingY = {
  paddingTop: "22px",
  paddingBottom: "22px",
};

const paragraph = {
  margin: "0",
  lineHeight: "2",
};

const global = {
  paddingX,
  paddingY,
  defaultPadding: {
    ...paddingX,
    ...paddingY,
  },
  paragraphWithBold: { ...paragraph, fontWeight: "bold" },
  heading: {
    fontSize: "32px",
    lineHeight: "1.3",
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: "-1px",
  },
  text: {
    ...paragraph,
    color: "#747474",
    fontWeight: "500",
  },
  button: {
    border: "1px solid #929292",
    fontSize: "16px",
    textDecoration: "none",
    padding: "10px 0px",
    width: "220px",
    display: "block",
    textAlign: "center",
    fontWeight: 500,
    color: "#000",
  },
  hr: {
    borderColor: "#E5E5E5",
    margin: "0",
  },
};

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "10px auto",
  width: "600px",
  border: "1px solid #E5E5E5",
};

const receipt = {
  container: {
    padding: "22px 40px",
    backgroundColor: "#F7F7F7",
  },
  id: {
    margin: "12px 0 0 0",
    fontWeight: 500,
    lineHeight: "1.4",
    color: "#6F6F6F",
    fontSize: "24px",
  },
  info: {
    label: {
      margin: "0 0 0 0",
      fontSize: "16px",
      fontWeight: 600,
      lineHeight: "1.4",
      color: "#222222",
    },
    value: {
      margin: "0 0 0 0",
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: "1.4",
      color: "#6F6F6F",
    },
  },
  product: {
    label: {
      margin: "0 0 0 0",
      fontWeight: 500,
      lineHeight: "1.4",
      color: "#6F6F6F",
    },
    value: {
      margin: "0 0 0 0",
      fontWeight: 500,
      lineHeight: "1.4",
      color: "#11dF00",
    },
  },
  total: {
    label: {
      margin: "0 0 0 0",
      fontWeight: 500,
      fontSize: "24px",
      lineHeight: "1.4",
      color: "#6F6F6F",
    },
    value: {
      margin: "0 0 0 0",
      fontWeight: 800,
      fontSize: "32px",
      lineHeight: "1.4",
      color: "#11dF00",
    },
  },
};

const message = {
  padding: "40px 74px",
  textAlign: "center",
};

const adressTitle = {
  ...paragraph,
  fontSize: "15px",
  fontWeight: "bold",
};

const recomendationsText = {
  margin: "0",
  fontSize: "15px",
  lineHeight: "1",
  paddingLeft: "10px",
  paddingRight: "10px",
};

const recomendations = {
  container: {
    padding: "20px 0",
  },
  product: {
    verticalAlign: "top",
    textAlign: "left",
    paddingLeft: "2px",
    paddingRight: "2px",
  },
  title: { ...recomendationsText, paddingTop: "12px", fontWeight: "500" },
  text: {
    ...recomendationsText,
    paddingTop: "4px",
    color: "#747474",
  },
};

const menu = {
  container: {
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingTop: "20px",
    backgroundColor: "#F7F7F7",
  },
  content: {
    ...paddingY,
    paddingLeft: "20px",
    paddingRight: "20px",
  },
  title: {
    paddingLeft: "20px",
    paddingRight: "20px",
    fontWeight: "bold",
  },
  text: {
    fontSize: "13.5px",
    marginTop: 0,
    fontWeight: 500,
    color: "#000",
  },
  tel: {
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingTop: "32px",
    paddingBottom: "22px",
  },
};

const categories = {
  container: {
    width: "370px",
    margin: "auto",
    paddingTop: "12px",
  },
  text: {
    fontWeight: "500",
    color: "#000",
  },
};

const footer = {
  policy: {
    width: "166px",
    margin: "auto",
  },
  text: {
    margin: "0",
    color: "#AFAFAF",
    fontSize: "13px",
    textAlign: "center",
  },
};
