"use client";

import {
  AddressBook,
  Bank,
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

export function CheckoutComponent({ data }) {
  const { enderecos } = data;

  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [step, setStep] = useState({
    enderecos: "process",
    produtos: "wait",
    pay: "wait",
    done: "wait",
  });

  const getCdEnderecoFlPadrao = (enderecos = []) => {
    return enderecos.find((endereco) => endereco.flpadrao === "S").cdendereco;
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
        return "pay";
      case "pay":
        return "done";
      case "done":
        return "done";
      default:
        return "enderecos";
    }
  };

  const handleProsseguir = () => {
    console.log(step);
    const stepInProcess = Object.keys(step).find(
      (key) => step[key] === "process",
    );

    const nextStep = getNextStep(stepInProcess);

    setStep({
      ...step,
      [stepInProcess]: "done",
      [nextStep]: "process",
    });
  };

  const formik = useFormik({
    initialValues: {
      cdendereco: getCdEnderecoFlPadrao(enderecos),
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div>
      <Steps
        className="mb-8"
        items={[
          {
            title: "Endereço",
            status: "process",
            icon: (
              <StepIcon
                status={step.enderecos}
                ProcessIcon={AddressBook}
                // className="aspect-square w-12"
              />
            ),
          },
          {
            title: "Produtos",
            status: "wait",
            icon: (
              <StepIcon status={step.produtos} ProcessIcon={GameController} />
            ),
          },
          {
            title: "Pay",
            status: "wait",
            icon: <StepIcon status={step.pay} ProcessIcon={Bank} />,
          },
          {
            title: "Done",
            status: "wait",
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

      <div
        data-show={step.produtos}
        className="wrapper hidden data-[show='process']:block"
      >
        <Title>Produtos:</Title>
        <Pacotes pacotes={data.produtos} />
      </div>

      <div
        data-show={step.pay}
        className="wrapper hidden data-[show='process']:block"
      >
        <Title>Pay:</Title>
      </div>

      <div
        data-show={step.done}
        className="wrapper hidden data-[show='process']:block"
      >
        <Title>Done:</Title>
        <Result
          status="success"
          // title="Successfully Purchased Cloud Server ECS!"
          title="Pedido realizado com sucesso!"
          // subTitle="Código do pedido: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
          subTitle="Código do pedido: 2017182818828182881 O seu pedido pode demorar um pouco para ser processado, por favor aguarde."
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
              <Button onClick={() => router.push("/")} type="primary" key="buy">
                Continuar
              </Button>
            </div>,
          ]}
        />
      </div>

      <Button
        type="primary"
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
    <button
      data-type={props.type}
      onClick={onClick}
      className={twMerge(
        "max-w-[300px] rounded-full p-4 text-white shadow-md outline-none",
        className,
        "data-[type='primary']:bg-green-400 data-[type='primary']:text-white dark:data-[type='primary']:bg-green-600 dark:data-[type='primary']:text-green-600",
        "data-[type='secondary']:bg-white data-[type='secondary']:text-green-400 dark:data-[type='secondary']:bg-slate-300 dark:data-[type='secondary']:text-green-600",
      )}
      {...props}
    >
      <span className="font-semibold lg:text-lg">{children}</span>
    </button>
  );
};
