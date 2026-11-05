/**
 Beatriz Lima de Moura - RA: 10416616
 Giovana Simões Franco - RA: 10417646
 Julia Santos Oliveira - RA: 10417672
 Larissa Yuri Sato - RA: 10418318
 */

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reforço Comunitário",
  description: "Projeto de reforço comunitário e apoio à educação.",
  icons: {
    icon: "/assets/icons/logo2.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
