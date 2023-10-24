"use client";

import React from "react";
import { RequiredField } from "../RequiredField";
import { twJoin, twMerge } from "tailwind-merge";
import { Dropdown } from "antd";
import Image from "@/components/Image";

function ImageSelect(props) {
  const items = props.items;

  if (!items) throw new Error(`A propriedade 'items' não é uma lista`);

  const isSvg = props.items?.some((item) => item.src.endsWith(".svg"));

  const tooltips = props.items?.filter((item) => item.tooltip);

  const hasTooltip = tooltips.length > 0;

  const noItemLabel = props.noItemLabel;

  const disabled = props.disabled;

  function onChange(value) {
    if (disabled) return props.onChange(props.name, null);
    if (props.onChange) {
      props.onChange(props.name, value);
    }
  }

  return (
    <div
      className={twMerge(
        `flex h-full w-full flex-col gap-2 rounded-xl`,
        props.className,
      )}
    >
      <div className="flex flex-col">
        <span
          data-show={Boolean(props.label)}
          className={twMerge(
            "text-lg font-bold data-[show=false]:hidden",
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
                    <span>
                      <strong>
                        {item.label} - {item.strongLabel}:
                      </strong>
                      <span className="whitespace-pre-line">
                        {" "}
                        {item.tooltip}
                      </span>
                    </span>
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
          "hide-scrollbar flex h-full w-auto items-start justify-start gap-4 whitespace-nowrap border border-transparent data-[banner=true]:flex-wrap data-[banner=false]:flex-nowrap data-[error=true]:border-red-500 max-lg:overflow-x-auto lg:flex-wrap",
          props.carouselClassname,
        )}
        data-banner={props.isBanner}
        data-error={props.error}
        data-svg={isSvg}
      >
        {items
          ?.filter((item) => !item.disabled)
          .map((item) => (
            <div
              key={item.value}
              className={twMerge(
                "flex flex-col items-center opacity-30 hover:cursor-pointer hover:opacity-100 data-[selected=true]:opacity-100",
                props.carouselContainerClassname,
              )}
              data-selected={props.value === item.value}
              onClick={() => !item.disabled && onChange(item.value)}
            >
              <Image
                className={twMerge(
                  `mb-2 select-none bg-cover bg-no-repeat p-0 hover:duration-75 data-[banner=true]:m-0 data-[aspect='1/1']:aspect-square data-[aspect='16/9']:aspect-video data-[aspect='1/1']:w-[64px] data-[aspect='16/9']:w-[94px] data-[banner=true]:w-[94px] data-[banner=true]:lg:hover:scale-125 data-[banner=true]:lg:active:scale-110`,
                  props.carouselImageClassname,
                )}
                data-banner={props.isBanner}
                data-aspect={item.aspect || "1/1"}
                src={item.src}
                alt={item.label}
              />
              <div
                className={twJoin(
                  "flex flex-col gap-0",
                  props.carouselLabelClassname,
                  item.strongLabel ? "mb-2" : "",
                )}
              >
                <span className="font-helvetica whitespace-pre-line break-words text-center text-base tracking-wide">
                  {noItemLabel ? "" : item.label}
                </span>
                <strong>{item.strongLabel}</strong>
              </div>
              <span className="mt-auto text-center text-sm font-light">
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
