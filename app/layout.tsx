import type { Metadata } from "next";
import localFont from "next/font/local";
import "@public/css/main.css";
import { ClerkProvider } from "@clerk/nextjs";
import { esMX } from "@clerk/localizations";

const nunito = localFont({
  src: "../public/fonts/Nunito.ttf",
});

export const metadata: Metadata = {
  title: "Ecomercado",
  description: "Ecommerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      localization={esMX}
      appearance={{
        // baseTheme: dark,
        variables: { colorPrimary: "#0fa294" },
      }}
    >
      <html lang="es">
        <body className={`${nunito.className} antialiased overflow-hidden`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
