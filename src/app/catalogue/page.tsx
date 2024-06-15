"use client";
import Filters from "@/components/catalogue/Filters";
import ModulesSelection from "@/components/catalogue/ModulesSelection";
import ProductsContainer from "@/components/catalogue/ProductsContainer";
import { useCommonData } from "@/hooks/useCommonData";
import clientProductService from "@/services/clientProductsService";
import { useCurrencyStore } from "@/stores/currency";
import { useInventoryStore } from "@/stores/inventory";
import { useModuleStore } from "@/stores/module";
import { Product } from "@/types/shared";
import { Backdrop, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import Image from "next/image";

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
  const [inventoryId, setInventoryId] = useState(selectedInventory?._id ?? "");

  const onFilter = async (text: string, inventoryId: string) => {
    setText(text);
    setInventoryId(inventoryId);
  };

  useEffect(() => {
    const fecthProducts = async () => {
      if (!selectedCurrency || !inventoryId || !selectedModule) {
        return;
      }

      setIsLoading(true);
      try {
        const products = await clientProductService.filterProducts(
          text,
          selectedCurrency._id,
          inventoryId,
          selectedModule._id,
          1,
          10
        );

        setProducts(products);
      } catch (error) {
        console.error("Error while getting filters");
      } finally {
        setIsLoading(false);
      }
    };

    fecthProducts();
  }, [text, inventoryId, selectedCurrency, selectedModule]);

  return (
    <>
      <div className="flex flex-col gap-[10px] pt-6 px-[10x] pb-0">
        {modules.length && selectedModule ? (
          <>
            <ModulesSelection
              modules={modules}
              selectedModule={selectedModule}
              onModuleSelected={(module) => setSelectedModule(module)}
            />
            <Filters
              onFilter={onFilter}
              inventories={inventories}
              selectedInventory={selectedInventory}
            />
            <ProductsContainer {...{ products }} />
          </>
        ) : (
          <>
            <Skeleton variant="rectangular" height={360} width={"100%"} />
            <Skeleton variant="rectangular" height={56} width={"100%"} />
            <Skeleton variant="rectangular" height={56} width={"100%"} />
            <Skeleton variant="rectangular" height={56} width={"100%"} />
          </>
        )}
      </div>
      <Backdrop open={isLoading} sx={{ zIndex: "100" }}>
        <Image
          src="/brand.svg"
          alt="Toditico"
          width={300}
          height={200}
          priority
        />
      </Backdrop>
    </>
  );
}
