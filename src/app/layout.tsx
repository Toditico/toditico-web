import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RootThemeProvider from "@/components/layout/RootThemeProvider";
import HeaderSkeleton from "@/components/layout/HeaderSkeleton";
import "yet-another-react-lightbox/styles.css";
import "maplibre-gl/dist/maplibre-gl.css";
import { Suspense } from "react";
import NextTopLoader from "nextjs-toploader";
import { colors } from "@/constants/colors";

const satoshi = localFont({ src: "../../public/fonts/Satoshi-Variable.woff2" });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <RootThemeProvider>
        <body className={satoshi.className}>
          <NextTopLoader color={colors.primary} showSpinner={false} />
          <Suspense fallback={<HeaderSkeleton />}>
            <Header />
          </Suspense>
          {children}
          <Footer />
        </body>
      </RootThemeProvider>
    </html>
  );
}
