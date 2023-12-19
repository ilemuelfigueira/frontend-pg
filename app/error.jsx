"use client";

import { Button, Result } from "antd";
import { useRouter } from "next/navigation";

export default function Error({ error, ...props }) {
  const router = useRouter();

  return (
    <div className="m-auto">
      <Result
        status="error"
        title={"Erro"}
        subTitle={error.message || "Ops, algo deu errado."}
        extra={
          <>
            <Button
              className="aspect-square bg-white font-semibold tracking-wider  text-slate-800"
              type="text"
              onClick={() => router.push("/")}
            >
              Início
            </Button>
            <Button
              className="aspect-square bg-blue-500 font-semibold tracking-wider  text-white"
              type="text"
              onClick={() => router.refresh()}
            >
              Tente novamente
            </Button>
          </>
        }
      />
    </div>
  );
}
