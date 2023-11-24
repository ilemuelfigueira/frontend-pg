import { Skeleton } from "antd";
import NextImage from "next/image";
import Link from "next/link";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

const ILink = ({ href, children, ...props }) => {
  return href ? (
    <Link className="cursor-pointer" href={href}>
      {children}
    </Link>
  ) : (
    <>{children}</>
  );
};

export default function Image({
  imageClassname,
  priority,
  isLoading,
  ...props
}) {
  const [reveal, setReveal] = useState(false);

  const src = props.isError ? "/logo-192x192.png" : props.src;

  const isError = props.isError;

  return (
    <div style={{ position: "relative" }} {...props}>
      {src && !isLoading && !isError && (
        <ILink href={props.href} className="cursor-pointer">
          <NextImage
            className={twMerge(
              "bg-cover data-[visible=true]:visible data-[visible=false]:invisible",
              imageClassname,
            )}
            priority={priority}
            data-visible={reveal}
            alt={props.alt || "Imagem sem descrição"}
            onLoad={() => setReveal(true)}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src={src}
          />
        </ILink>
      )}
      {(!reveal || !src || isLoading) && (
        <Skeleton.Image active className="h-full w-full rounded-xl" />
      )}
    </div>
  );
}
