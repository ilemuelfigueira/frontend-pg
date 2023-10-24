import { Poppins } from "next/font/google";

import Navigator from "@/components/Navigator";
import StyledComponentsRegistry from "@/lib/AntdRegistry";

import { ConfigProvider } from "antd";
import theme from "@/lib/AntdTheme";

import "primeicons/primeicons.css";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

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
      className={`${poppins.variable}`}
    >
      <body className="flex w-full flex-col items-center justify-center bg-gray-200">
        <StyledComponentsRegistry>
          <ConfigProvider theme={theme}>
            <Navigator>{children}</Navigator>
          </ConfigProvider>
        </StyledComponentsRegistry>
      </body>
    </html >
  );
}
