"use client";
import Filters from "@/components/catalogue/Filters";
import ModulesSelection from "@/components/catalogue/ModulesSelection";
import { useCommonData } from "@/hooks/useCommonData";
import { useInventoryStore } from "@/stores/inventory";
import { useModuleStore } from "@/stores/module";

export default function Catalogue() {
  useCommonData();
  const modules = useModuleStore((state) => state.modules);
  const inventories = useInventoryStore((state) => state.inventories);
  const selectedInventory = useInventoryStore(
    (state) => state.selectedInventory
  );

  return (
    <div className="flex flex-col gap-[10px] pt-6 px-[10x] pb-0">
      <ModulesSelection modules={modules} />
      <Filters
        inventories={inventories}
        selectedInventory={selectedInventory}
      />
    </div>
  );
}
