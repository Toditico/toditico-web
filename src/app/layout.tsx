"use client";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@emotion/react";
import { theme } from "@/theme";

const satoshi = localFont({ src: "../../public/fonts/Satoshi-Variable.woff2" });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider {...{ theme }}>
        <body className={satoshi.className}>
          <Header />
          {children}
          <Footer />
        </body>
      </ThemeProvider>
    </html>
  );
}
