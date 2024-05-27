"use client";

import { useState } from "react";
import { OptionSelect } from "./components/option-select";
import { useFormik } from "formik";
import { initializeForm } from "@/lib/util/formik";
import { aplicarMascara } from "@/lib/util";
import { ShareNetwork } from "@phosphor-icons/react";
import toast from "react-hot-toast";
import { cadastrarPacoteCarrinho } from "@/actions/carrinho";

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
            // message: `Selecione um subproduto (${tipo})`,
            message: `Selecione uma opção`,
          },
        ],
      });
    });

    return fields;
  }

  function getSumPrices(subprodutos = [], formikValues = {}) {
    let sum = 0;

    for (const key of Object.keys(formikValues)) {
      const item = subprodutos.find(
        (sp) => sp.cdsubproduto === formikValues[key],
      );

      if (item) sum += Number(item.vlsubproduto);
    }

    return sum;
  }

  const formik = useFormik({
    ...initializeForm(getFields),
    onSubmit: async (values) => {
      console.log(values);
      try {
        if (dataMap.get("expired_login") === "S")
          throw new Error("autentique-se");

        const user = dataMap.get("user");

        const produto = dataMap.get("produto");
        const produtoBanners = produto?.banners || []

        const pacote = {
          cdusuario: user.id,
          nmpacote: produto.nmproduto,
          nmpathname: `/produto/${produto.cdproduto}`,
          avatar: produtoBanners[0] || null,
        };

        let items = [];
        if (tipos.length == 0)
          items.push({
            cdproduto: produto.cdproduto,
            avatar: produtoBanners[0] || null,
          });
        else
          for (const key of Object.keys(values).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))) {
            const _subproduto = dataMap
              .get("subProdutos")
              ?.find((subproduto) => subproduto.cdsubproduto === values[key]);

            items.push({
              cdproduto: produto.cdproduto,
              cdsubproduto: values[key],
              avatar: _subproduto.avatar,
              nmtipo: key,
            });
          }

          const payload = {
            pacote,
            items,
            cdproduto: produto.cdproduto,
          }

        const response = await cadastrarPacoteCarrinho(payload)

        if(response?.error) throw new Error(`Erro cadastrando produto no carrinho com o id ${produto.cdproduto} \n${response?.error}`)

        toast.success('Verifique seu carrinho.')
      } catch (error) {
        console.error(error.message)
        console.error(error.stack);
        toast.error("Erro ao cadastrar produto");
      }
    },
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
      <form className="grid grid-cols-1 gap-4">
        <ul className="grid grid-cols-1 gap-2">
          {getFields.map((field) => (
            <li key={field.name}>
              <span className="text-sm font-semibold">
                {`${field.name} `}
                {/* <span className="font-light">
                  {dataMap
                    .get("subProdutos")
                    .find(
                      (subproduto) =>
                        subproduto.cdsubproduto == formik.values[field.name],
                    )?.nmsubproduto}
                </span> */}
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
                    price: item?.vlsubproduto,
                    label: item.nmsubproduto,
                    value: item.cdsubproduto,
                  }))}
              />
              {formik.touched[field.name] && formik.errors[field.name] ? (
                <span className="text-xs text-red-400">
                  {formik.errors[field.name]}
                </span>
              ) : null}
            </li>
          ))}
        </ul>
        <span className="sticky bottom-0 z-10 w-full bg-gray-100 pb-2 text-2xl font-bold uppercase">
          Total:{" "}
          <span className="text-green-400">{`R$ ${getSumPrices(
            dataMap.get("subProdutos"),
            formik.values,
          )}`}</span>
        </span>
        <button
          disabled={formik.isSubmitting || Object.keys(formik.errors).length > 0}
          data-error={Object.keys(formik.errors).length > 0}
          className="-mt-2 rounded-full data-[error=true]:bg-slate-400 disabled:bg-slate-400 bg-green-400 px-4 py-2 text-white outline-none"
          onClick={formik.handleSubmit}
        >
          Adicionar ao carrinho
        </button>
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
