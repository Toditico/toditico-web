import { getCommonDataAction } from "@/actions/commonActions";
import OurBussiness from "@/components/home/OurBussiness";
import OurStats from "@/components/home/OurStats";
import StoreCommonData from "@/components/layout/StoreCommonData";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Suspense, useMemo } from "react";
import ogImage from "@public/opengraph-image.jpg";

export const metadata: Metadata = {
  title: "Inicio | TODITICO",
  description:
    "TODITICO es un proyecto relativamente joven, con el concepto de tienda comercializadora de partes y piezas de la industria automotriz en el mercado cubano",
  metadataBase: new URL("https://toditico-web-eight.vercel.app/"),
  openGraph: {
    images: {
      url: ogImage.src,
      width: ogImage.width,
      height: ogImage.height,
    },
  },
  twitter: {
    images: {
      url: ogImage.src,
      width: ogImage.width,
      height: ogImage.height,
    },
  },
};

export default async function Home() {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/home/Map/"), {
        ssr: false,
      }),
    [],
  );

  const data = await getCommonDataAction();

  return (
    <div className="flex flex-col gap-6 items-center">
      <OurBussiness />
      {data && (
        <Map
          inventories={data.inventories ?? []}
          workshops={data.workshops ?? []}
        />
      )}
      <OurStats
        customers={data.stats.customers ?? 0}
        products={data.stats.products ?? 0}
        sales={data.stats.sales ?? 0}
      />
      <Suspense>
        <StoreCommonData commonData={data} />
      </Suspense>
    </div>
  );
}
