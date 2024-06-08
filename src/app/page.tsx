"use client";
import OurBussiness from "@/components/home/OurBussiness";
import OurStats from "@/components/home/OurStats";
import InventorySelectionDialog from "@/components/layout/InventorySelectionDialog";
import { useCommonData } from "@/hooks/useCommonData";
import dynamic from "next/dynamic";
import { useMemo } from "react";

export default function Home() {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/home/Map/"), {
        ssr: false,
      }),
    []
  );

  const data = useCommonData();

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
      <InventorySelectionDialog />
    </div>
  );
}
