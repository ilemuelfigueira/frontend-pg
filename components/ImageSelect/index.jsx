"use client";

import React from "react";
import { RequiredField } from "../RequiredField";
import { twJoin, twMerge } from "tailwind-merge";
import { Dropdown } from "antd";
import Image from "@/components/Image";
import { floatToBRL } from "@/lib/util/intl";
import If from "@/components/If";
import { NewText } from "../NewText";

export const Root = ({ children, className, ...props }) => (
  <div
    className={twMerge(
      `flex h-full w-full flex-col gap-2 rounded-xl`,
      className,
    )}
    {...props}
  >
    {children}
  </div>
);

export const Helper = ({ children, className, items = [], ...props }) =>
  items.length > 0 && (
    <Dropdown
      menu={{
        items: items.map((helper) => ({
          key: helper.label + helper.strongLabel,
          label: (
            <span>
              <strong>
                {helper.label} - {helper.strongLabel}:
              </strong>
              <span className="whitespace-pre-line">{helper.message}</span>
            </span>
          ),
        })),
      }}
      placement="bottom"
    >
      <i className="pi pi-info-circle ml-2 hover:cursor-pointer"></i>
    </Dropdown>
  );

export const Header = ({
  className,
  showTooltip,
  helperList = [],
  error = "",
  label,
  ...props
}) => (
  <div className="flex flex-col">
    <span
      data-show={Boolean(label)}
      className={twMerge(
        "text-lg font-bold data-[show=false]:hidden",
        className,
      )}
    >
      {label}
      <Helper items={helperList} />
    </span>
    <If condition={error}>
      <RequiredField active={Boolean(error)}>
        <strong>*</strong> Este campo é obrigatório.
      </RequiredField>
    </If>
  </div>
);

export const ImageSelectLoading = ({ title = "", size = 6 }) => {
  const arr = Array(size).fill(0);
  return (
    <div className="flex flex-col items-start gap-4">
      <span>{title}</span>
      <div className="hide-scrollbar flex w-full gap-4 overflow-x-auto">
        {arr.map(() => (
          <Image
            key={Math.random()}
            className={`mb-2 aspect-square h-[94px] w-[94px] select-none bg-cover bg-no-repeat p-0 hover:duration-75`}
            // data-aspect={item.aspect || "1/1"}
            src={null}
            alt={"Imagem carregando..."}
          />
        ))}
      </div>
    </div>
  );
};

function ImageSelect(props) {
  if (props.isLoading) return <ImageSelectLoading />;
  const items = props.items;

  if (!items) throw new Error(`A propriedade 'items' não é uma lista`);
  if (items.length == 0) return "";

  const isSvg = props.items?.some((item) => item.src.endsWith(".svg"));

  const helperList = props.items?.filter((item) => item.tooltip) || [];

  const noItemLabel = props.noItemLabel;

  const disabled = props.disabled;

  function onChange(value) {
    if (disabled) return props.onChange(props.name, null);
    if (props.onChange) {
      props.onChange(props.name, value);
    }
  }

  return (
    <Root className={props.className}>
      <Header
        helperList={helperList}
        label={props.label}
        error={props.error}
        showTooltip={helperList.length > 0}
      />
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
                  "flex flex-col items-center gap-0",
                  props.carouselLabelClassname,
                  item.strongLabel ? "mb-2" : "",
                )}
              >
                <span className="font-helvetica whitespace-pre-wrap break-words text-center text-base tracking-wide">
                  {noItemLabel ? "" : <NewText text={item.label} />}
                </span>
                <strong>{item.strongLabel}</strong>
              </div>
              <span className="mt-auto text-center text-sm font-light">
                {floatToBRL(item.price)}
              </span>
            </div>
          ))}
      </div>
      <If condition={props.error}>
        <RequiredField active={Boolean(props.error)}>
          <strong>*</strong> Este campo é obrigatório.
        </RequiredField>
      </If>
    </Root>
  );
}

export default ImageSelect;
