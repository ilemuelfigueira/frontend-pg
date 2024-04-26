import { Breadcrumb } from "antd";
import Link from "next/link";

export const metadata = {
  title: {
    template: "%s | Parceiros",
  },
};

export default function Layout({ children }) {
  return (
    <div className="w-full -mt-8">
      {children}
    </div>
  );
}
