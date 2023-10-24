import { Skeleton } from "antd";
import NextImage from "next/image";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export default function Image(props) {
  if (!props.src) throw new Error("A propriedade src não existe");
  const [reveal, setReveal] = useState(false);

  return (
    <div style={{ position: "relative" }} {...props}>
      <NextImage
        className={twMerge(
          "bg-cover data-[visible=true]:visible data-[visible=false]:invisible",
          props?.imageClassname,
        )}
        data-visible={reveal}
        alt={props.src}
        onLoadingComplete={() => setReveal(true)}
        fill
        src={props.src}
      />
      {!reveal && <Skeleton.Image className="h-full w-full rounded-xl" />}
    </div>
  );
}
