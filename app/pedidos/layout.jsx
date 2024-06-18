import { Breadcrumb } from "antd";
import Link from "next/link";

const thumbnail = {
  url: "/receipt.png",
  width: 1200,
  height: 630,
  alt: "Pedidos",
};

const defaultMetadata = {
  title: "Pedidos | PGCUSTOM",
  description: "Visualizar seus pedidos",
  images: [thumbnail],
};

export const metadata = {
  ...defaultMetadata,
  twitter: {
    ...defaultMetadata,
    card: "summary_large_image",
    site: "@pgcustomstore",
    creator: "@pgcustomstore",
  },
  openGraph: {
    ...defaultMetadata,
    type: "website",
    url: process.env.NEXT_PUBLIC_DOMAIN,
    siteName: "PG CUSTOM",
  },
};

export default function Layout({ children }) {
  return (
    <div className="w-full max-w-page-limit px-1 md:px-4">
      <Breadcrumb
        items={[{ title: <Link href="/">Início</Link> }, { title: "Pedidos" }]}
        className="mb-8"
      />
      {children}
    </div>
  );
}
