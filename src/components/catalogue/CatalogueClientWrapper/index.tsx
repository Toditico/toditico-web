"use client";

import { CommonResponse } from "@/types/home";
import { Module, Product } from "@/types/shared";
import ModulesSelection from "../ModulesSelection";
import Filters from "../Filters";
import ProductsContainer from "../ProductsContainer";
import { useEffect, useState } from "react";
import { useModuleStore } from "@/stores/module";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCurrencyStore } from "@/stores/currency";
import { useInventoryStore } from "@/stores/inventory";
import NoProductsPlaceholder from "../NoProductsPlaceholder";

type Props = {
  data: CommonResponse;
  lastFetchedProducts: Product[];
  maxPage: number;
};

export default function CatalogueClientWrapper({
  data,
  lastFetchedProducts,
  maxPage,
}: Props) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [isFetchingProducts, setIsFetchingProducts] = useState(true);

  useEffect(() => {
    setProducts([...products, ...lastFetchedProducts]);
    setIsFetchingProducts(false);
  }, [lastFetchedProducts]);

  const setSelectedModule = useModuleStore((state) => state.setSelectedModule);
  const selectedModule = useModuleStore((state) => state.selectedModule);
  const selectedCurrency = useCurrencyStore((state) => state.selectedCurrency);
  const setSelectedInventory = useInventoryStore(
    (state) => state.setSelectedInventory,
  );
  const selectedInventoryStore = useInventoryStore(
    (state) => state.selectedInventory,
  );

  const refetchProducts = (queryParams: string, scroll: boolean) => {
    router.push(`${pathName}?${queryParams}`, { scroll });
    setIsFetchingProducts(true);
  };

  useEffect(() => {
    if (
      selectedCurrency &&
      selectedCurrency._id !== searchParams.get("currency")
    ) {
      setProducts([]);
      const currency = selectedCurrency._id;
      const inventory = searchParams.get("inventory");
      const moduleParam = searchParams.get("module");
      const query = searchParams.get("query") || "";
      const queryParams = `currency=${currency}&inventory=${inventory}&query=${query}&module=${moduleParam}&page=1`;
      refetchProducts(queryParams, true);
    }
  }, [selectedCurrency]);

  useEffect(() => {
    if (
      selectedInventoryStore &&
      selectedInventoryStore._id !== searchParams.get("inventory")
    ) {
      setProducts([]);
      const inventory = selectedInventoryStore._id;
      const currency = searchParams.get("currency");
      const moduleParam = searchParams.get("module");
      const query = searchParams.get("query") || "";
      const queryParams = `currency=${currency}&inventory=${inventory}&query=${query}&module=${moduleParam}&page=1`;
      refetchProducts(queryParams, true);
    }
  }, [selectedInventoryStore]);

  const selectedInventory = searchParams.get("inventory") ?? "";
  const selectedQuery = searchParams.get("query") ?? "";

  const onModuleSelected = (module: Module) => {
    setSelectedModule(module);
    setProducts([]);
    const currency = searchParams.get("currency");
    const inventory = searchParams.get("inventory");
    const query = searchParams.get("query") || "";
    const queryParams = `currency=${currency}&inventory=${inventory}&query=${query}&module=${module._id}&page=1`;
    refetchProducts(queryParams, false);
  };

  const onFilter = async (userInput: string, userSelectedInventory: string) => {
    const previousProductName = searchParams.get("query");
    const previousSelectedInventory = searchParams.get("inventory");
    if (
      userInput === previousProductName &&
      userSelectedInventory === previousSelectedInventory
    ) {
      return;
    }
    setProducts([]);
    const currency = searchParams.get("currency");
    const moduleParam = searchParams.get("module");
    const queryParams = `currency=${currency}&inventory=${userSelectedInventory}&query=${userInput}&module=${moduleParam}&page=1`;
    setSelectedInventory(userSelectedInventory);
    refetchProducts(queryParams, false);
  };

  const fetchNextPage = () => {
    const page = parseInt(searchParams.get("page") || "1");
    if (page === maxPage || isFetchingProducts) {
      return;
    }

    const currency = searchParams.get("currency");
    const inventory = searchParams.get("inventory");
    const query = searchParams.get("query");
    const moduleParam = searchParams.get("module");
    const queryParams = `currency=${currency}&inventory=${inventory}&query=${query}&module=${moduleParam}&page=${page + 1}`;
    refetchProducts(queryParams, false);
  };

  return (
    <>
      <ModulesSelection
        modules={data.modules}
        {...{ onModuleSelected, selectedModule }}
      />
      <Filters
        inventories={data.inventories}
        {...{ onFilter, selectedInventory, selectedQuery }}
      />
      <ProductsContainer
        {...{ products, maxPage, fetchNextPage }}
        isLoading={isFetchingProducts}
      />
      {!isFetchingProducts && !products.length && <NoProductsPlaceholder />}
    </>
  );
}
