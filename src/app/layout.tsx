"use client";
import NavigationBar from "@/components/layout/NavigationBar";
import localFont from "next/font/local";
import "./globals.css";
import { Button } from "@mui/material";
import { IconShoppingBag } from "@tabler/icons-react";

const satoshi = localFont({ src: "../../public/fonts/Satoshi-Variable.woff2" });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <header></header>
      <body className={satoshi.className}>
        <NavigationBar />
        <div className="h-[400px] bg-[url('../../public/images/hero-mobile.jpeg')] bg-cover py-[10px] px-[24px]">
          <div className="mx-auto my-[24px] text-center flex flex-col gap-[24px]">
            <h1 className="font-black text-h1 uppercase text-white">
              Rueda con confianza
            </h1>
            <h3 className="font-medium text-h3 uppercase text-white">
              Servicio superior, precios justos, calidad insuperable y garantía
              que perdura
            </h3>
            <Button
              className="text-button h-[44px] rounded-lg py-[10px] px-[16px] uppercase bg-primary font-bold"
              variant="contained"
              startIcon={<IconShoppingBag />}
            >
              Explora nuestro catálogo
            </Button>
          </div>
        </div>

        {children}
      </body>
    </html>
  );
}
