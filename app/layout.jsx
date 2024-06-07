import "primeicons/primeicons.css";
import "./globals.css";

import { Poppins } from "next/font/google";

import StyledComponentsRegistry from "@/lib/AntdRegistry";

import { ConfigProvider } from "antd";
import theme from "@/lib/AntdTheme";
import { Toaster } from "react-hot-toast";
import { HeaderNavigator } from "@/components/Header";
import { readUserOrThrow } from "@/lib/util/supabase";

import "moment/locale/pt-br";
import moment from "moment";
moment.locale("pt-br");

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const thumbnail = {
  url: "/logo-32x32.png",
  width: 32,
  height: 32,
  alt: "Home",
};

const defaultMetadata = {
  title: "PG CUSTOM",
  description: "Loja de venda e personalização de controles de videogame",
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

async function loadData() {
  const map = new Map();

  await readUserOrThrow({
    onSuccess: ({ user }) => {
      map.set("user", user);
      map.set("expired_login", "N");
    },
    onExpired: () => {
      map.set("expired_login", "S");
      map.set("user", null);
    },
  });

  return map;
}

/**
 *
 * @type {import('next').Route}
 * @param {import('next').GetStaticPropsContext} context
 *
 */
export default async function RootLayout({ children, params, ...props }) {
  const data = await loadData();

  params.user = data.get("user");
  params.expired_login = data.get("expired_login");

  return (
    <html lang="pt-BR" className={`${poppins.variable}`}>
      <StyledComponentsRegistry>
        <ConfigProvider theme={theme}>
          <body className="w-full max-w-full bg-gray-100">
            <HeaderNavigator
              user={data.get("user")}
              expired_login={data.get("expired_login")}
            />
            <section className="mx-auto my-0 flex flex-col items-center">
              <Toaster />
              {children}
            </section>
            <footer className="flex w-full items-start justify-between bg-[#121212] p-10 shadow-md max-md:flex-col max-md:items-start max-md:justify-start max-md:gap-8">
              <div className="grid grid-cols-1 gap-8 dark:border-gray-800 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                <div>
                  <p className="text-base font-bold text-white dark:text-white">
                    Loja
                  </p>

                  <ul className="mt-6 space-y-4 text-sm">
                    <li>
                      <a
                        href="#"
                        className="font-normal text-white transition hover:opacity-75 dark:text-gray-200"
                      >
                        PG Painted
                      </a>
                    </li>

                    <li>
                      <a
                        href="/parceiro"
                        className="font-normal text-white transition hover:opacity-75 dark:text-gray-200"
                      >
                        Coleção Parceiros
                      </a>
                    </li>

                    <li>
                      <a
                        href="#"
                        className="font-normal text-white transition hover:opacity-75 dark:text-gray-200"
                      >
                        Envie o seu
                      </a>
                    </li>

                    <li>
                      <a
                        href="/produtos?nmproduto=PS5"
                        className="font-normal text-white transition hover:opacity-75 dark:text-gray-200"
                      >
                        PS5
                      </a>
                    </li>

                    <li>
                      <a
                        href="/produtos?nmproduto=PS4"
                        className="font-normal text-white transition hover:opacity-75 dark:text-gray-200"
                      >
                        PS4
                      </a>
                    </li>

                    <li>
                      <a
                        href="/produtos?nmproduto=XBOX"
                        className="font-normal text-white transition hover:opacity-75 dark:text-gray-200"
                      >
                        XBOX
                      </a>
                    </li>

                    <li>
                      <a
                        href="#"
                        className="font-normal text-white transition hover:opacity-75 dark:text-gray-200"
                      >
                        Consoles
                      </a>
                    </li>

                    <li>
                      <a
                        href="#"
                        className="font-normal text-white transition hover:opacity-75 dark:text-gray-200"
                      >
                        Mouses
                      </a>
                    </li>

                    <li>
                      <a
                        href="#"
                        className="font-normal text-white transition hover:opacity-75 dark:text-gray-200"
                      >
                        Arcades
                      </a>
                    </li>

                    <li>
                      <a
                        href="#"
                        className="font-normal text-white transition hover:opacity-75 dark:text-gray-200"
                      >
                        Instale você mesmo
                      </a>
                    </li>

                    <li>
                      <a
                        href="#"
                        className="font-normal text-white transition hover:opacity-75 dark:text-gray-200"
                      >
                        Acessórios
                      </a>
                    </li>

                    <li>
                      <a
                        href="#"
                        className="font-normal text-white transition hover:opacity-75 dark:text-gray-200"
                      >
                        PG Trade-In
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="text-base font-bold text-white dark:text-white">
                    Empresa
                  </p>

                  <ul className="mt-6 space-y-4 text-sm">
                    <li>
                      <a
                        href="/sobre"
                        className="font-normal text-white transition hover:opacity-75 dark:text-gray-200"
                      >
                        Sobre
                      </a>
                    </li>

                    <li>
                      <a
                        href="/time-pg"
                        className="font-normal text-white transition hover:opacity-75 dark:text-gray-200"
                      >
                        Equipe
                      </a>
                    </li>

                    <li>
                      <a
                        href="/avaliacoes"
                        className="font-normal text-white transition hover:opacity-75 dark:text-gray-200"
                      >
                        Avaliações
                      </a>
                    </li>

                    <li>
                      <a
                        href="/termos-de-uso"
                        className="font-normal text-white transition hover:opacity-75 dark:text-gray-200"
                      >
                        Termos de uso
                      </a>
                    </li>

                    <li>
                      <a
                        href="/garantias"
                        className="font-normal text-white transition hover:opacity-75 dark:text-gray-200"
                      >
                        Garantias
                      </a>
                    </li>

                    <li>
                      <a
                        href="/devolucoes"
                        className="font-normal text-white transition hover:opacity-75 dark:text-gray-200"
                      >
                        Devoluções
                      </a>
                    </li>

                    <li>
                      <a
                        href="/privacidade"
                        className="font-normal text-white transition hover:opacity-75 dark:text-gray-200"
                      >
                        Privacidade
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="text-base font-bold text-white dark:text-white">
                    Suporte
                  </p>

                  <ul className="mt-6 space-y-4 text-sm">
                    <li>
                      <a
                        href="/contato"
                        className="font-normal text-white transition hover:opacity-75 dark:text-gray-200"
                      >
                        Contato
                      </a>
                    </li>

                    <li>
                      <a
                        href="/rastrear-pedido"
                        className="font-normal text-white transition hover:opacity-75 dark:text-gray-200"
                      >
                        Rastrear pedido
                      </a>
                    </li>

                    <li>
                      <a
                        href="/faqs"
                        className="font-normal text-white transition hover:opacity-75 dark:text-gray-200"
                      >
                        {`FAQ's`}
                      </a>
                    </li>

                    <li>
                      <a
                        href="/testar-controles"
                        className="font-normal text-white transition hover:opacity-75 dark:text-gray-200"
                      >
                        Testar controles
                      </a>
                    </li>

                    <li>
                      <a
                        href="/manuais-e-instrucoes"
                        className="font-normal text-white transition hover:opacity-75 dark:text-gray-200"
                      >
                        Manuais e instruções
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="sm:flex sm:flex-col sm:items-start sm:justify-start">
                <div
                  id="right-footer"
                  className="flex flex-col items-start justify-start gap-12 text-center text-slate-800 dark:text-slate-300"
                >
                  <div
                    id="novidades-email-container"
                    className="flex flex-col items-start justify-start gap-4"
                  >
                    <span className="text-lg font-bold text-white">
                      Receba novidades por e-mail
                    </span>
                    <div
                      id="novidades-email-input-container"
                      className="flex items-center"
                    >
                      <input
                        id="novidades-email-input"
                        type="email"
                        placeholder="Endereço de email"
                        className="w-72 rounded-md border px-2 py-1 outline-none placeholder:text-xs max-md:w-44"
                      />
                      <button className="aspect-video rounded-md bg-blue-600 p-2 text-xs font-semibold text-white outline-none focus:bg-blue-800 focus:outline active:bg-blue-800">
                        Enviar
                      </button>
                    </div>
                  </div>

                  <div
                    id="social-media-container"
                    className="flex flex-col items-start justify-start gap-4"
                  >
                    <span className="text-lg font-bold text-white">
                      Social Media
                    </span>
                    <ul className="flex justify-start gap-3 sm:mt-0 sm:justify-end">
                      <li>
                        <a
                          href="https://www.facebook.com/pgcustomstore"
                          rel="noreferrer"
                          target="_blank"
                          className="font-normal text-white transition hover:opacity-75 dark:text-gray-200"
                        >
                          <span className="sr-only">Facebook</span>

                          <svg
                            className="h-6 w-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </a>
                      </li>

                      <li>
                        <a
                          href="https://www.instagram.com/pgcustomstore/"
                          rel="noreferrer"
                          target="_blank"
                          className="font-normal text-white transition hover:opacity-75 dark:text-gray-200"
                        >
                          <span className="sr-only">Instagram</span>

                          <svg
                            className="h-6 w-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </a>
                      </li>

                      <li>
                        <a
                          href="https://www.tiktok.com/@pgcustomstore"
                          rel="noreferrer"
                          target="_blank"
                          className="font-normal text-white transition hover:opacity-75 dark:text-gray-200"
                        >
                          <span className="sr-only">Tiktok</span>

                          <svg
                            className="h-6 w-6"
                            viewBox="0 0 19 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M18.0501 8.6101C17.8801 8.6301 17.71 8.6401 17.53 8.6401C15.63 8.6401 13.8701 7.6901 12.8301 6.1001V14.7501C12.8301 18.2801 9.97005 21.1401 6.44005 21.1401C2.91005 21.1401 0.0500488 18.2801 0.0500488 14.7501C0.0500488 11.2201 2.91005 8.3601 6.44005 8.3601C6.57005 8.3601 6.70005 8.3701 6.84005 8.3801V11.5301C6.71005 11.5101 6.58005 11.4901 6.44005 11.4901C4.64005 11.4901 3.18005 12.9501 3.18005 14.7501C3.18005 16.5501 4.64005 18.0101 6.44005 18.0101C8.24005 18.0101 9.83005 16.5901 9.83005 14.7901L9.86005 0.100098H12.8701C13.1501 2.8001 15.3301 4.9101 18.0401 5.1101V8.6101"
                              fill="white"
                            />
                          </svg>
                        </a>
                      </li>

                      <li>
                        <a
                          href="https://www.youtube.com/@pgcustomstore"
                          rel="noreferrer"
                          target="_blank"
                          className="font-normal text-white transition hover:opacity-75 dark:text-gray-200"
                        >
                          <span className="sr-only">Youtube</span>

                          <svg
                            className="h-6 w-6"
                            viewBox="0 0 31 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M30.7801 6.71014C30.7801 3.08014 27.8401 0.140137 24.2101 0.140137H7.40008C3.77008 0.140137 0.830078 3.08014 0.830078 6.71014V14.5301C0.830078 18.1601 3.77008 21.1001 7.40008 21.1001H24.2101C27.8401 21.1001 30.7801 18.1601 30.7801 14.5301V6.71014ZM20.8901 11.2101L13.3501 14.9401C13.0501 15.1001 12.0501 14.8901 12.0501 14.5501V6.90014C12.0501 6.56014 13.0601 6.35014 13.3601 6.51014L20.5701 10.4301C20.8701 10.6001 21.1901 11.0401 20.8801 11.2101H20.8901Z"
                              fill="white"
                            />
                          </svg>
                        </a>
                      </li>

                      <li>
                        <a
                          href="https://twitter.com/pgcustomstore"
                          rel="noreferrer"
                          target="_blank"
                          className="font-normal text-white transition hover:opacity-75 dark:text-gray-200"
                        >
                          <span className="sr-only">Twitter</span>

                          <svg
                            className="h-6 w-6"
                            viewBox="0 0 22 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M11.2802 0C5.41015 0 0.660156 4.76 0.660156 10.62C0.660156 16.48 5.42015 21.24 11.2802 21.24C17.1402 21.24 21.9001 16.48 21.9001 10.62C21.9001 4.76 17.1402 0 11.2802 0ZM13.9501 16.78L10.3401 11.95L5.87015 16.78H4.72015L9.83015 11.26L4.75015 4.47H8.66016L11.9902 8.92L16.1102 4.47H17.2601L12.5002 9.61L17.8602 16.78H13.9501Z"
                              fill="white"
                            />
                            <path
                              d="M6.42993 5.31006L14.3699 15.9301H16.1699L8.22993 5.31006H6.42993Z"
                              fill="white"
                            />
                          </svg>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </footer>
          </body>
        </ConfigProvider>
      </StyledComponentsRegistry>
    </html>
  );
}
