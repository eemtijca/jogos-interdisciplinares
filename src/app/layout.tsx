import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { MathJaxProvider } from "@/components/mathjax/mathjax-provider";
import { A11yProvider } from "@/components/a11y/a11y-provider";

// Fontes variáveis hospedadas localmente (OFL), sem consulta ao Google Fonts no
// desenvolvimento e no build: a resposta esporádica /l/font?kit=... quebra o
// Turbopack (vercel/next.js#99114). O mesmo arquivo é declarado por peso para
// manter o pareamento que o next/font/google gerava, inclusive para pesos
// intermediários, como o 500.
const baloo = localFont({
  src: [
    { path: "./fonts/baloo-2.woff2", weight: "600", style: "normal" },
    { path: "./fonts/baloo-2.woff2", weight: "700", style: "normal" },
    { path: "./fonts/baloo-2.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-baloo",
  display: "swap",
});

const nunito = localFont({
  src: [
    { path: "./fonts/nunito.woff2", weight: "400", style: "normal" },
    { path: "./fonts/nunito.woff2", weight: "600", style: "normal" },
    { path: "./fonts/nunito.woff2", weight: "700", style: "normal" },
    { path: "./fonts/nunito.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Ludus",
    template: "%s · Ludus",
  },
  description:
    "Jogos de investigação do ensino médio com DUA/AEE: leitura em voz alta, sem cronômetro e no ritmo do estudante. Sala de Recursos da EEMTI José Cláudio de Araújo.",
  applicationName: "Ludus",
  keywords: [
    "jogos educacionais",
    "ensino médio",
    "BNCC",
    "DUA",
    "AEE",
    "sala de recursos",
    "acessibilidade",
  ],
  authors: [{ name: "Sala de Recursos · EEMTI José Cláudio de Araújo" }],
};

export const viewport: Viewport = {
  themeColor: "#008241",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${baloo.variable} ${nunito.variable} antialiased bg-background text-foreground`}
      >
        <MathJaxProvider>
          <A11yProvider>{children}</A11yProvider>
        </MathJaxProvider>
        <Toaster />
      </body>
    </html>
  );
}
