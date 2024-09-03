import { useCurrencyStore } from "@/stores/currency";
import { useInventoryStore } from "@/stores/inventory";
import { useModuleStore } from "@/stores/module";
import { CommonResponse } from "@/types/home";
import { useEffect } from "react";

export function useCommonData(commonData: CommonResponse) {
  const setCurrencies = useCurrencyStore((state) => state.setCurrencies);
  const setInventories = useInventoryStore((state) => state.setInventories);
  const setModules = useModuleStore((state) => state.setModules);

  useEffect(() => {
    if (commonData) {
      const { currencies, inventories, modules } = commonData;
      setCurrencies(currencies);
      setInventories(inventories);
      setModules(modules);
    }
  }, [commonData]);
}
