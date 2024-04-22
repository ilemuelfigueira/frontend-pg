"use client";

import {
  AddressBook,
  CheckCircle,
  CircleDashed,
  GameController,
  PlusCircle,
  Smiley,
  SmileyNervous,
  SmileyXEyes,
} from "@phosphor-icons/react";
import { Result, Steps } from "antd";
import { useFormik } from "formik";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Pacotes } from "../Pacotes";
import { cadastrarPedido } from "@/actions/pedido";

export function CheckoutComponent({ data }) {
  const { enderecos } = data;

  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [step, setStep] = useState({
    enderecos: "process",
    produtos: "wait",
    done: "wait",
  });

  const [pedido, setPedido] = useState();

  const getCdEnderecoFlPadrao = (enderecos = []) => {
    const enderecoPadrao = enderecos.find((endereco) => endereco?.flpadrao === "S")?.cdendereco;

    if(!enderecoPadrao) return ''

    return enderecoPadrao
  };

  const url = `${pathName}?${searchParams.toString()}`;

  const StepIcon = ({ status, ProcessIcon = SmileyNervous, ...props }) => {
    switch (status) {
      case "process":
        return (
          <ProcessIcon
            className={twMerge("aspect-square w-12", props.className)}
          />
        );
      case "wait":
        return (
          <CircleDashed
            className={twMerge(
              "aspect-square w-12 animate-spin",
              props.className,
            )}
          />
        );
      case "done":
        return (
          <CheckCircle
            className={twMerge("aspect-square w-12", props.className)}
          />
        );
      case "error":
        return (
          <SmileyXEyes
            className={twMerge("aspect-square w-12", props.className)}
          />
        );
      default:
        return (
          <Smiley className={twMerge("aspect-square w-12", props.className)} />
        );
    }
  };

  const getNextStep = (currentStep) => {
    switch (currentStep) {
      case "enderecos":
        return "produtos";
      case "produtos":
        return "done";
      case "done":
        return "done";
      default:
        return "enderecos";
    }
  };

  const handleProsseguir = async () => {
    const stepInProcess = Object.keys(step).find(
      (key) => step[key] === "process",
    );

    const nextStep = getNextStep(stepInProcess);

    if (nextStep == "done") {
      return formik.handleSubmit();
    }

    setStep({
      ...step,
      [stepInProcess]: "done",
      [nextStep]: "process",
    });
  };

  const formik = useFormik({
    initialValues: {
      cdendereco: getCdEnderecoFlPadrao(enderecos),
      cdcarrinho: data.cdcarrinho,
    },
    onSubmit: async (values) => {
      const response = await cadastrarPedido(values);

      setPedido(response.pedido);

      setStep({
        ...step,
        ["produtos"]: "done",
        ["done"]: "done",
      });
    },
  });

  return (
    <div>
      <Steps
        className="mb-8"
        items={[
          {
            title: "Endereço",
            status: step.enderecos,
            icon: (
              <StepIcon
                status={step.enderecos}
                ProcessIcon={AddressBook}
              />
            ),
          },
          {
            title: "Produtos",
            status: step.produtos,
            icon: (
              <StepIcon status={step.produtos} ProcessIcon={GameController} />
            ),
          },
          {
            title: "Done",
            status: step.done,
            icon: <StepIcon status={step.done} ProcessIcon={Smiley} />,
          },
        ]}
      />
      <div
        data-show={step.enderecos}
        className="wrapper hidden data-[show='process']:block"
      >
        <Title>Endereços:</Title>
        <div className="flex items-center justify-start">
          <ul
            className="flex w-full flex-wrap items-start justify-start gap-2"
            name="cdendereco"
          >
            {enderecos.map((item) => (
              <li
                style={{
                  flex: "1 0 300px",
                }}
                className="aspect-video border border-transparent p-4 shadow-md hover:cursor-pointer hover:border-yellow-300 data-[checked=true]:border-green-300"
                key={item.cdendereco}
                onClick={() =>
                  formik.setFieldValue("cdendereco", item.cdendereco)
                }
                data-checked={formik.values.cdendereco === item.cdendereco}
              >
                <div className="flex flex-col content-center items-start justify-center text-sm">
                  <span>
                    Responsável:
                    <strong className="tracking-wide">
                      {` ${item.nmresponsavel}`}
                    </strong>
                  </span>
                  <span>Endereço: {item.nmendereco}</span>
                  <span>Cep: {item.nucep}</span>
                  <span>Nº: {item.nuendereco}</span>
                  <span>Complemento: {item.nmcomplemento}</span>
                  <span>Cidade: {item.nmcidade}</span>
                  <span>Estado: {item.nmestado}</span>
                </div>
              </li>
            ))}
            <li
              style={{
                flex: "1 0 300px",
              }}
            >
              <Link
                className="flex aspect-video flex-col items-center justify-center bg-slate-50 p-4 shadow-md"
                href={`/formulario-entrega?redirect_url=${url}`}
              >
                <PlusCircle className="aspect-square h-16 w-16 text-green-500" />
                <span className="text-center text-lg font-bold text-slate-700 md:text-2xl">
                  Adicionar novo endereço
                </span>
              </Link>
            </li>
            <li
              style={{
                flex: "1 0 300px",
                content: "",
                visibility: "hidden",
              }}
            />
            <li
              style={{
                flex: "1 0 300px",
                content: "",
                visibility: "hidden",
              }}
            />
            <li
              style={{
                flex: "1 0 300px",
                content: "",
                visibility: "hidden",
              }}
            />
            <li
              style={{
                flex: "1 0 300px",
                content: "",
                visibility: "hidden",
              }}
            />
          </ul>
        </div>
      </div>

      <section
        data-show={step.produtos}
        className="wrapper hidden data-[show='process']:flex flex-col gap-4"
      >
        <Title >Produtos:</Title>
        <Pacotes pacotes={data.produtos} />
      </section>

      <div
        data-show={step.done}
        className="wrapper hidden data-[show='done']:block data-[show='process']:block"
      >
        <Title>Done:</Title>
        <Result
          status="success"
          title="Pedido fechado!"
          subTitle={`Código do pedido: ${pedido?.cdpedido}.\nEfetue o pagamento e aguarde a confirmação que irá demorar alguns instantes!`}
          extra={[
            <div
              key="buttons"
              className="flex items-center justify-center gap-2"
            >
              <Button
                onClick={() => router.push("/pedidos")}
                type="secondary"
                key="console"
              >
                Ver Meus Pedidos
              </Button>
              <Button
                href={pedido?.payment_url}
                target="_blank"
                type="primary"
                key="buy"
              >
                Pagar
              </Button>
            </div>,
          ]}
        />
      </div>

      <Button
        type="primary"
        data-done={step.done == "done" || step.done == "process"}
        className="float-right mt-8 data-[done=true]:hidden"
        onClick={handleProsseguir}
      >
        Prosseguir
      </Button>
    </div>
  );
}

const Title = ({ children, className, ...props }) => {
  return (
    <span
      className={twMerge(
        "text-lg font-bold text-slate-700 md:text-2xl",
        className,
      )}
    >
      {children}
    </span>
  );
};

const Button = ({ children, className, onClick, ...props }) => {
  return (
    <a
      href={props?.href}
      target={props?.target}
      data-type={props.type}
      onClick={onClick}
      className={twMerge(
        "max-w-[300px] rounded-full p-4 text-white shadow-md outline-none hover:cursor-pointer active:opacity-90",
        className,
        "data-[type='primary']:bg-green-400 data-[type='primary']:text-white dark:data-[type='primary']:bg-green-600 dark:data-[type='primary']:text-green-600",
        "data-[type='secondary']:bg-white data-[type='secondary']:text-green-400 dark:data-[type='secondary']:bg-slate-300 dark:data-[type='secondary']:text-green-600",
      )}
      {...props}
    >
      <span className="font-semibold lg:text-lg">{children}</span>
    </a>
  );
};
