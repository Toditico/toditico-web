"use client";
import OurBussiness from "@/components/home/OurBussiness";
import OurStats from "@/components/home/OurStats";
import dynamic from "next/dynamic";
import { useMemo } from "react";

export default function Home() {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/home/Map"), {
        ssr: false,
      }),
    []
  );

  return (
    <div className="flex flex-col gap-6 items-center">
      <OurBussiness />
      <Map />
      <OurStats />
    </div>
  );
}
