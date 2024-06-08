import clientCommonService from "@/services/clientCommonService";
import { useCurrencyStore } from "@/stores/currency";
import { useInventoryStore } from "@/stores/inventory";
import { useModuleStore } from "@/stores/module";
import { CommonResponse } from "@/types/home";
import { useEffect, useState } from "react";

export function useCommonData() {
  const [data, setData] = useState<CommonResponse>();
  const setCurrencies = useCurrencyStore((state) => state.setCurrencies);
  const setInventories = useInventoryStore((state) => state.setInventories);
  const setModules = useModuleStore((state) => state.setModules);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await clientCommonService.getData();
        const { currencies, inventories, modules } = data;
        setCurrencies(currencies);
        setInventories(inventories);
        setModules(modules);
        setData(data);
      } catch (error) {
        console.log("error: ", error);
      }
    };
    getData();
  }, []);

  return data;
}
