import { Breadcrumb } from "antd";
import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div>
      <Breadcrumb
        items={[
          { title: <Link href="/">Início</Link> },
          { title: "Carrinho" },
          { title: "Checkout" },
        ]}
        className="mb-8"
      />
      {children}
    </div>
  );
}
