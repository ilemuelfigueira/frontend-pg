import "primeicons/primeicons.css";
import "./globals.css";

import { Poppins } from "next/font/google";

import StyledComponentsRegistry from "@/lib/AntdRegistry";

import { ConfigProvider } from "antd";
import theme from "@/lib/AntdTheme";
import { Toaster } from "react-hot-toast";
import { HeaderNavigator } from "@/components/Header";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  metadataBase: process.env.NEXT_PUBLIC_DOMAIN,
  title: "PG CUSTOM",
  description: "Loja de venda e personalização de controles de videogame",
  icons: {
    icon: "/logo-32x32.png",
  },
  verification: {
    google: "google-site-verification=123133123113",
  },
};

async function loadData() {
  // if (!session)
  //   return {
  //     carrinho: null,
  //   };

  return { carrinho: {} };
}

/**
 *
 * @type {import('next').Route}
 * @param {import('next').GetStaticPropsContext} context
 *
 */
export default function RootLayout({ children, ...props }) {
  // const data = await loadData();
  return (
    <html lang="pt-BR" className={`${poppins.variable}`}>
      <body className="mx-auto my-0 bg-slate-50 sm:w-[500px] md:w-[700px] lg:w-[800px] xl:w-[1100px] 2xl:w-[1400px]">
        <StyledComponentsRegistry>
          <ConfigProvider theme={theme}>
            <Toaster />
            <HeaderNavigator />
            {children}
          </ConfigProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
