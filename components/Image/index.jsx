import { Skeleton } from "antd";
import NextImage from "next/image";
import Link from "next/link";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

const ILink = ({ href, children, ...props }) => {
  return href ? <Link className="cursor-pointer" href={href}>{children}</Link> : <>{children}</>;
};

export default function Image({ imageClassname, ...props }) {
  if (!props.src) throw new Error("A propriedade src não existe");
  const [reveal, setReveal] = useState(false);

  return (
    <div style={{ position: "relative" }} {...props}>
      <ILink href={props.href} className="cursor-pointer">
        <NextImage
          className={twMerge(
            "bg-cover data-[visible=true]:visible data-[visible=false]:invisible",
            imageClassname,
          )}
          data-visible={reveal}
          alt={props.src}
          onLoadingComplete={() => setReveal(true)}
          fill
          src={props.src}
        />
      </ILink>
      {!reveal && (
        <Skeleton.Image active className="h-full w-full rounded-xl" />
      )}
    </div>
  );
}
