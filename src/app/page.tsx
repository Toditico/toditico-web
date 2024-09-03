import { getCommonDataAction } from "@/actions/commonActions";
import OurBussiness from "@/components/home/OurBussiness";
import OurStats from "@/components/home/OurStats";
import StoreCommonData from "@/components/layout/StoreCommonData";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { useMemo } from "react";

export const metadata: Metadata = {
  title: "Inicio | TODITICO",
  description: "...",
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
          inventories={data?.inventories ?? []}
          workshops={data?.workshops ?? []}
        />
      )}
      <OurStats
        customers={data?.stats.customers ?? 0}
        products={data?.stats.products ?? 0}
        sales={data?.stats.sales ?? 0}
      />
      <StoreCommonData commonData={data} />
    </div>
  );
}
