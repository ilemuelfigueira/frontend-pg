import { Breadcrumb } from "antd";
import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div className="max-w-page-limit px-1 md:px-4">
      <Breadcrumb
        items={[
          { title: <Link href="/">Início</Link> },
          { title: "Meus Endereços" },
        ]}
        className="mb-8"
      />
      {children}
    </div>
  );
}
