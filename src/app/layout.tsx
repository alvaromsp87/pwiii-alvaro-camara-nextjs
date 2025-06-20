// src/app/layout.tsx
import type { Metadata } from "next";
import { Bebas_Neue } from "next/font/google";
import "./globals.css";
import { BackgroundImage } from "@/components/BackgroundImage";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas-neue",
});

export const metadata: Metadata = {
  title: "Meu Portfólio",
  description: "Criado com Next.js e amor por Supernatural",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${bebasNeue.variable} font-sans bg-stone-900 text-gray-200`}>
        <BackgroundImage />
        {children}
      </body>
    </html>
  );
}