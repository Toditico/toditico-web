"use client";
import Filters from "@/components/catalogue/Filters";
import ModulesSelection from "@/components/catalogue/ModulesSelection";
import ProductsContainer from "@/components/catalogue/ProductsContainer";
import { useCommonData } from "@/hooks/useCommonData";
import clientProductService from "@/services/clientProductsService";
import { useCurrencyStore } from "@/stores/currency";
import { useInventoryStore } from "@/stores/inventory";
import { useModuleStore } from "@/stores/module";
import { Module, Product } from "@/types/shared";
import { useEffect, useState } from "react";

export default function Catalogue() {
  useCommonData();
  const modules = useModuleStore((state) => state.modules);
  const selectedModule = useModuleStore((state) => state.selectedModule);
  const setSelectedModule = useModuleStore((state) => state.setSelectedModule);
  const inventories = useInventoryStore((state) => state.inventories);
  const selectedInventory = useInventoryStore(
    (state) => state.selectedInventory
  );
  const selectedCurrency = useCurrencyStore((state) => state.selectedCurrency);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState("");
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(10);
  const [inventoryId, setInventoryId] = useState(selectedInventory?._id ?? "");

  const onFilter = async (userInput: string, userSelectedInventory: string) => {
    if (text === userInput && inventoryId === userSelectedInventory) {
      return;
    }
    setText(userInput);
    setInventoryId(inventoryId);
    setProducts([]);
    setPage(1);
  };

  const onSelectedModule = async (module: Module) => {
    setSelectedModule(module);
    setProducts([]);
    setPage(1);
  };

  const fetchNextPage = () => {
    if (page === maxPage) {
      return;
    }

    if (isLoading) {
      return;
    }

    setPage(page + 1);
  };

  useEffect(() => {
    const fecthProducts = async () => {
      if (!selectedCurrency || !inventoryId || !selectedModule || isLoading) {
        return;
      }

      setIsLoading(true);
      try {
        const { result, paginationInfo } =
          await clientProductService.filterProducts(
            text,
            selectedCurrency._id,
            inventoryId,
            selectedModule._id,
            page,
            10
          );

        setProducts([...products, ...result]);
        setMaxPage(paginationInfo.maxPage);
      } catch (error) {
        console.error("Error while getting filters");
      } finally {
        setIsLoading(false);
      }
    };

    fecthProducts();
  }, [text, inventoryId, selectedCurrency, selectedModule, page]);

  return (
    <>
      <div className="flex flex-col gap-[10px] pt-6 px-[10x] pb-0">
        <>
          <ModulesSelection
            modules={modules}
            selectedModule={selectedModule}
            onModuleSelected={onSelectedModule}
          />
          <Filters
            onFilter={onFilter}
            inventories={inventories}
            selectedInventory={selectedInventory}
            isLoading={modules.length === 0}
          />
          <ProductsContainer {...{ products, isLoading, fetchNextPage }} />
        </>
      </div>
    </>
  );
}
