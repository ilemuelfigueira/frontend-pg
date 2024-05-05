"use client";

import { useState } from "react";
import { OptionSelect } from "./components/option-select";
import { useFormik } from "formik";
import { initializeForm } from "@/lib/util/formik";
import { aplicarMascara } from "@/lib/util";
import { ShareNetwork } from "@phosphor-icons/react";

export function Comercial({ dataMap }) {
  const tipos = distinctListByKey(
    dataMap.get("subProdutos"),
    "nmsubprodutotipo",
  );

  const [getFields, setFields] = useState(() => {
    const defaultValues = initialFields();

    return defaultValues;
  });

  function initialFields() {
    const fields = [];

    tipos.map((tipo) => {
      fields.push({
        type: "string",
        name: tipo,
        placeholder: `Selecione um subproduto do tipo ${tipo}`,
        value: "",
        validations: [
          {
            type: "required",
            message: `Selecione um subproduto (${tipo})`,
          },
        ],
      });
    });

    return fields;
  }

  const formik = useFormik({
    ...initializeForm(getFields),
  });

  const produto = dataMap.get("produto");

  return (
    <section className="grid grid-cols-1 gap-2 rounded-md border border-gray-200 p-4">
      <header className="grid grid-cols-1">
        <div className="flex items-start gap-1">
          <p className="text-xl font-medium tracking-tighter">
            {dataMap.has("produto") && dataMap.get("produto")?.nmproduto}
          </p>
          <ShareNetwork
            className="hover:cursor-pointer"
            size={24}
            onClick={() => {
              navigator.share({
                url: window.location.href,
                text: produto.nmproduto,
                title: produto.nmproduto,
              });
            }}
          >
            compartilhar
          </ShareNetwork>
        </div>
        <p>
          <span>a partir de</span>
          <span className="text-xl font-light">
            {" R$ "}
            {aplicarMascara(produto?.valorminimo, "real")}
          </span>
        </p>
      </header>
      <form>
        <ul className="grid grid-cols-1 gap-2">
          {getFields.map((field) => (
            <li key={field.name}>
              <span className="text-sm font-semibold">
                {`${field.name} : `}
                <span className="font-light">
                  {dataMap
                    .get("subProdutos")
                    .find(
                      (subproduto) =>
                        subproduto.cdsubproduto == formik.values[field.name],
                    )?.nmsubproduto || "Selecione"}
                </span>
              </span>
              <OptionSelect
                key={field.name}
                onChange={(value) => formik.setFieldValue(field.name, value)}
                className={`peer/${field.name}`}
                value={formik.values[field.name]}
                options={dataMap
                  .get("subProdutos")
                  .filter(
                    (subProduto) => subProduto.nmsubprodutotipo == field.name,
                  )
                  .map((item) => ({
                    image: item?.sub_produto_foto[0]?.nmpath || "/no-photo.png",
                    label: item.nmsubproduto,
                    value: item.cdsubproduto,
                  }))}
              />
              {formik.touched[field.name] && formik.errors[field.name] ? (
                <div>{formik.errors[field.name]}</div>
              ) : null}
            </li>
          ))}
        </ul>
      </form>
    </section>
  );
}

function distinctListByKey(list = [], key = "") {
  let aux = [];

  if (list?.length > 0)
    list.map((item) => {
      if (!aux.some((narrItem) => narrItem == item[key])) aux.push(item[key]);
    });

  return aux;
}

function subprodutoByTipo(list = [], tipo = "") {
  return list.find((item) => item.nmsubprodutotipo == tipo);
}
