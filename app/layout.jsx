import "primeicons/primeicons.css";
import "./globals.css";

import { Poppins } from "next/font/google";

import Navigator from "@/components/Navigator";
import StyledComponentsRegistry from "@/lib/AntdRegistry";

import { ConfigProvider } from "antd";
import theme from "@/lib/AntdTheme";
import { Toaster } from "react-hot-toast";

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
      <body className="flex w-full flex-col items-center justify-center bg-slate-50 ">
        <StyledComponentsRegistry>
          <ConfigProvider theme={theme}>
            <Toaster />
            <Navigator>
              {children}
            </Navigator>
          </ConfigProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
