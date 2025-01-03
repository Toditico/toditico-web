"use client";

import { CommonResponse } from "@/types/home";
import { Module, Product } from "@/types/shared";
import ModulesSelection from "../ModulesSelection";
import Filters from "../Filters";
import ProductsContainer from "../ProductsContainer";
import { useEffect, useRef, useState } from "react";
import { useModuleStore } from "@/stores/module";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCurrencyStore } from "@/stores/currency";
import { useInventoryStore } from "@/stores/inventory";
import NoProductsPlaceholder from "../NoProductsPlaceholder";
import { pagination } from "@/constants/pagination";
import { filterProductsAction } from "@/actions/productActions";
import ScrollToTopButton from "../ScrollToTopButton";
import { scrollToElement } from "@/utils/scroll";
import NProgress from "nprogress";

type Props = {
  data: CommonResponse;
  lastFetchedProducts: Product[];
  maxPage: number;
  page: number;
};

export default function CatalogueClientWrapper({
  data,
  lastFetchedProducts,
  maxPage,
  page,
}: Props) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const lowestScrollPosition = useRef(0);
  const positionAtWhichButtonIsShown = useRef(0);
  const showScrollButton = useRef<boolean>(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [isFetchingProducts, setIsFetchingProducts] = useState(true);
  const [showScrollToTopButton, setShowScrollToTopButton] = useState(
    showScrollButton.current,
  );

  useEffect(() => {
    if (isFetchingProducts) {
      NProgress.start();
      return;
    }
    NProgress.done();
  }, [isFetchingProducts]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Update the lowest scroll position when scrolling down
      if (currentScrollY > lowestScrollPosition.current) {
        lowestScrollPosition.current = currentScrollY;
      }

      // Show button if scrolled up more than 1500 pixels from the lowest position
      if (
        !showScrollButton.current &&
        currentScrollY < lowestScrollPosition.current - 1500 &&
        currentScrollY > 2000
      ) {
        showScrollButton.current = true;
        setShowScrollToTopButton(true);
        positionAtWhichButtonIsShown.current = currentScrollY;
      }

      // Hide button if scrolled down more than 800 pixels from the last shown position
      if (
        showScrollButton.current &&
        currentScrollY > positionAtWhichButtonIsShown.current
      ) {
        showScrollButton.current = false;
        setShowScrollToTopButton(false);
        lowestScrollPosition.current = currentScrollY;
      }

      if (
        currentScrollY < positionAtWhichButtonIsShown.current &&
        showScrollButton.current
      ) {
        positionAtWhichButtonIsShown.current = currentScrollY;
      }

      if (currentScrollY < 2000) {
        showScrollButton.current = false;
        setShowScrollToTopButton(false);
        lowestScrollPosition.current = currentScrollY;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setShowScrollToTopButton(showScrollButton.current);
  }, [showScrollButton.current]);

  useEffect(() => {
    setProducts([...products, ...lastFetchedProducts]);
    setIsFetchingProducts(false);
  }, [lastFetchedProducts]);

  useEffect(() => {
    const lastProductDetails = localStorage.getItem("last-product-details");
    if (
      lastProductDetails &&
      (page === 1 || page === undefined) &&
      products.length
    ) {
      setTimeout(() => {
        scrollToElement(lastProductDetails);
        localStorage.removeItem("last-product-details");
      }, 500);
    }
  }, [page, products]);

  useEffect(() => {
    if (isFetchingProducts) {
      return;
    }

    const currency = searchParams.get("currency") || "";
    const inventory = searchParams.get("inventory") || "";
    const moduleParam = searchParams.get("module") || "";
    const query = searchParams.get("query") || "";
    const lastProductDetails = localStorage.getItem("last-product-details");
    // INFO: If this condition is satisfied it means that user got into this view by using back button
    if (page > 1 && products.length <= pagination.pageSize) {
      setIsFetchingProducts(true);
      filterProductsAction(
        query,
        inventory,
        currency,
        moduleParam,
        1,
        (page - 1) * pagination.pageSize,
      ).then(({ result }) => {
        setProducts([...result, ...products]);
        if (!lastProductDetails) {
          scrollToElement("modules-selection");
          return;
        }
        setTimeout(() => {
          scrollToElement(lastProductDetails);
          setIsFetchingProducts(false);
          localStorage.removeItem("last-product-details");
          showScrollButton.current = false;
          setShowScrollToTopButton(false);
          lowestScrollPosition.current = window.scrollY;
        }, 500);
      });
      return;
    }
  }, [isFetchingProducts]);

  const setSelectedModule = useModuleStore((state) => state.setSelectedModule);
  const selectedModule = useModuleStore((state) => state.selectedModule);
  const modules = useModuleStore((state) => state.modules);
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

  useEffect(() => {
    const newModule = modules.find(
      (module) => module._id === searchParams.get("module"),
    );
    newModule && onModuleSelected(newModule);
  }, [searchParams.get("module")]);

  const onModuleSelected = (module: Module) => {
    if (module._id === selectedModule?._id) {
      return;
    }
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
    <div className="xl:max-w-[1500px] xl:mx-auto">
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
      {showScrollToTopButton && <ScrollToTopButton />}
      {!isFetchingProducts && !products.length && <NoProductsPlaceholder />}
    </div>
  );
}
