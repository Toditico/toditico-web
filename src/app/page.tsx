"use client";
import OurBussiness from "@/components/home/OurBussiness";
import OurStats from "@/components/home/OurStats";
import InventorySelectionDialog from "@/components/layout/InventorySelectionDialog";
import clientHomeService from "@/services/clientHomeService";
import { useCurrencyStore } from "@/stores/currency";
import { useInventoryStore } from "@/stores/inventory";
import { HomeResponse } from "@/types/home";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/home/Map/"), {
        ssr: false,
      }),
    []
  );

  const [data, setData] = useState<HomeResponse>();

  const setCurrencies = useCurrencyStore((state) => state.setCurrencies);
  const setInventories = useInventoryStore((state) => state.setInventories);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await clientHomeService.getData();
        const { currencies, inventories } = data;
        setCurrencies(currencies);
        setInventories(inventories);
        setData(data);
      } catch (error) {
        console.log("error: ", error);
      }
    };
    getData();
  }, []);

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
