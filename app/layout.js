import { Inter } from "next/font/google";

import localFont from "next/font/local";
import Navigator from "@/components/Navigator";
import StyledComponentsRegistry from "@/lib/AntdRegistry";

import { ConfigProvider } from "antd";
import theme from "@/lib/AntdTheme";

import "primeicons/primeicons.css";
import "./globals.css";

const araboto = localFont({
  src: [
    {
      path: "../public/fonts/Araboto/ArabotoThin400.ttf",
      style: "normal",
      weight: "100",
    },
    {
      path: "../public/fonts/Araboto/ArabotoNormal400.ttf",
      style: "normal",
      weight: "400",
    },
    {
      path: "../public/fonts/Araboto/ArabotoMedium400.ttf",
      style: "medium",
      weight: "500",
    },
    {
      path: "../public/fonts/Araboto/ArabotoLight400.ttf",
      style: "normal",
      weight: "300",
    },
    {
      path: "../public/fonts/Araboto/ArabotoBold400.ttf",
      style: "normal",
      weight: "700",
    },
    {
      path: "../public/fonts/Araboto/ArabotoBlack400.ttf",
      style: "normal",
      weight: "900",
    },
  ],
  variable: "--font-araboto",
});

const helvetica = localFont({
  src: [
    {
      path: "../public/fonts/Helvetica/Helvetica400.ttf",
    },
  ],
  variable: "--font-helvetica",
});

const helveticaNeue = localFont({
  src: [
    {
      path: "../public/fonts/HelveticaNeue/HelveticaNeueLT65Medium450.ttf",
      style: "normal",
      weight: "400",
    },
  ],
  variable: "--font-helvetica-neue",
});

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PG CUSTOM",
  description: "Loja de venda e personalização de controles de videogame",
  icons: {
    icon: "/logo-32x32.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${araboto.variable} ${helvetica.variable} ${helveticaNeue.variable}`}
    >
      <body className="flex w-full flex-col items-center justify-center bg-slate-200">
        <StyledComponentsRegistry>
          <ConfigProvider theme={theme}>
            <Navigator>{children}</Navigator>
          </ConfigProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
