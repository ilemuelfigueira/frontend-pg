"use client";

import React from "react";
import { RequiredField } from "../RequiredField";
import { twJoin, twMerge } from "tailwind-merge";
import { Dropdown } from "antd";

function ImageSelect(props) {
  const items = props.items;

  if (!items) throw new Error(`A propriedade 'items' não é uma lista`);

  const isSvg = props.items?.some((item) => item.src.endsWith(".svg"));

  const tooltips = props.items?.filter((item) => item.tooltip);

  const hasTooltip = tooltips.length > 0;

  const noItemLabel = props.noItemLabel;

  function onChange(value) {
    if (props.onChange) {
      props.onChange(props.name, value);
    }
  }

  return (
    <div
      className={twMerge(`flex h-full w-full flex-col gap-2`, props.className)}
    >
      <div className="flex flex-col">
        <span
          data-show={Boolean(props.label)}
          className={twMerge(
            "font-helveticaNeue text-lg font-black data-[show=false]:hidden",
            props.labelClassname,
          )}
        >
          {props.label}
          {hasTooltip && (
            <Dropdown
              menu={{
                items: tooltips.map((item) => ({
                  key: item.label + item.strongLabel,
                  label: (
                    <>
                      <strong>
                        {item.label} - {item.strongLabel}: 
                      </strong>
                      <span> {item.tooltip}</span>
                    </>
                  ),
                })),
              }}
              placement="bottom"
            >
              <i className="pi pi-info-circle ml-2 hover:cursor-pointer"></i>
            </Dropdown>
          )}
        </span>
        {props.label ? (
          <RequiredField active={Boolean(props.error)}>
            <strong>*</strong> Este campo é obrigatório.
          </RequiredField>
        ) : (
          ""
        )}
      </div>
      <div
        className={twMerge(
          "flex w-full items-center justify-start gap-2 whitespace-nowrap border border-transparent data-[svg=true]:gap-4 data-[error=true]:border-red-500 max-lg:overflow-x-auto lg:flex-wrap",
          props.carouselClassname,
        )}
        data-error={props.error}
        data-svg={isSvg}
      >
        {items
          ?.filter((item) => !item.disabled)
          .map((item) => (
            <div
              key={item.value}
              className={twMerge(
                "flex flex-col items-center opacity-30 hover:opacity-100 data-[selected=true]:opacity-100",
                props.carouselContainerClassname,
              )}
              data-selected={props.value === item.value}
              data-svg={isSvg}
              onClick={() => !item.disabled && onChange(item.value)}
            >
              <img
                className={twMerge(
                  "aspect-square bg-cover bg-no-repeat p-0 hover:cursor-pointer hover:duration-75 data-[svg=false]:w-[94px] data-[svg=true]:w-[74px] data-[svg=false]:min-w-[94px] data-[svg=true]:min-w-[74px] data-[svg=false]:hover:scale-125 data-[svg=false]:active:scale-110",
                  props.carouselImageClassname,
                )}
                src={item.src}
                alt={item.label}
                data-svg={isSvg}
              />
              <div
                className={twJoin(
                  "flex flex-col gap-0",
                  props.carouselLabelClassname,
                  item.strongLabel ? "mb-2" : "",
                )}
              >
                <span className="break-words text-center font-helvetica text-sm tracking-wide">
                  {noItemLabel ? "" : item.label}
                </span>
                <strong>{item.strongLabel}</strong>
              </div>
              <span className="text-center text-base font-light">
                R$ {item.price}
              </span>
            </div>
          ))}
      </div>
      {props.label ? (
        ""
      ) : (
        <RequiredField active={Boolean(props.error)}>
          <strong>*</strong> Este campo é obrigatório.
        </RequiredField>
      )}
    </div>
  );
}

export default ImageSelect;
