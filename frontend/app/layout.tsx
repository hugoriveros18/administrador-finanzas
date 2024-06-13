/* eslint-disable prettier/prettier */
import "@/styles/globals.css";
import { Metadata } from "next";

import { Providers } from "./providers";

import Header from "@/components/organism/Header/Header";
import { fontLato } from "@/config/fonts";
import { ApolloWrapper } from "@/graphql/lib/apolloWrapper";
// import GraphqlProvider from "@/graphql/GraphqlProvider";

export const metadata: Metadata = {
  title: {
    absolute: "Finanzas Personales",
  },
  description: "Administra tus finanzas personales de forma sencilla y eficiente.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="es">
      <head />
      <body
        className={`min-h-screen w-full antialiased bg-bodyBg ${fontLato.className}`}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <ApolloWrapper>
            <Header />
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
              {children}
            </main>
          </ApolloWrapper>
        </Providers>
      </body>
    </html>
  );
}
