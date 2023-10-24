import NextImage from "next/image";
import { twMerge } from "tailwind-merge";

export default function Image(props) {
  if (!props.src) throw new Error("A propriedade src não existe");
  return (
    <div style={{ position: "relative" }} {...props}>
      <NextImage className="bg-cover" fill src={props.src} />
    </div>
  );
}
