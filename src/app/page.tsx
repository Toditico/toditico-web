"use client";
import OurBussiness from "@/components/home/OurBussiness";
import OurStats from "@/components/home/OurStats";
import clientHomeService from "@/services/clientHomeService";
import { HomeResponse } from "@/types/home";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/home/Map"), {
        ssr: false,
      }),
    []
  );

  const [data, setData] = useState<HomeResponse>();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await clientHomeService.getData();
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
      <Map />
      <OurStats
        customers={data?.stats.customers ?? 0}
        products={data?.stats.products ?? 0}
        sales={data?.stats.sales ?? 0}
      />
    </div>
  );
}
