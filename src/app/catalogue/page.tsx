"use client";
import ModulesSelection from "@/components/catalogue/ModulesSelection";
import { useCommonData } from "@/hooks/useCommonData";
import { useModuleStore } from "@/stores/module";

export default function Catalogue() {
  useCommonData();
  const modules = useModuleStore((state) => state.modules);

  return (
    <div className="flex flex-col gap-[10px] pt-6 px-[10x] pb-0">
      <ModulesSelection modules={modules} />
    </div>
  );
}
