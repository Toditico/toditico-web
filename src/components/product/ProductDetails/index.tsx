"use client";

import { Product } from "@/types/shared";
import { useEffect, useState } from "react";
import ProductImages from "./ProductImages";
import ProductInfo from "./ProductInfo";
import { Button } from "@mui/material";
import { IconShoppingBag } from "@tabler/icons-react";
import { useCartStore } from "@/stores/cart";
import { useCurrencyStore } from "@/stores/currency";
import { useInventoryStore } from "@/stores/inventory";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import NoProductPlaceholder from "../NoProductPlaceholder";
import { localStorageIDs } from "@/constants/localStorage";
import { useModuleStore } from "@/stores/module";

type Props = {
  product: Product | null;
  module?: string;
};

export default function ProductDetails({ product, module }: Props) {
  const increaseProduct = useCartStore((state) => state.increaseProduct);
  const selectedCurrency = useCurrencyStore((state) => state.selectedCurrency);
  const setSelectedCurrency = useCurrencyStore(
    (state) => state.setSelectedCurrency,
  );
  const currencies = useCurrencyStore((state) => state.currencies);
  const selectedInventory = useInventoryStore(
    (state) => state.selectedInventory,
  );
  const selectedModule = useModuleStore((state) => state.selectedModule);
  const modules = useModuleStore((state) => state.modules);
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const mainModule = modules.find((module) =>
    product?.modules.includes(module._id),
  );

  const addProductToCart = () => {
    if (selectedInventory && product) {
      increaseProduct(selectedInventory._id, product);
    }
  };

  useEffect(() => {
    const newCurrency = currencies.find(
      (currency) => currency._id === searchParams.get("currency"),
    );
    if (newCurrency) {
      newCurrency._id !== selectedCurrency?._id &&
        setSelectedCurrency(newCurrency);
    }
  }, [searchParams.get("currency")]);

  useEffect(() => {
    setTimeout(() => {
      const element = document.getElementById("product-details");
      if (element) {
        const offsetTop = element.offsetTop - 120;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    }, 100);
    product &&
      localStorage.setItem(localStorageIDs.lastProductDetails, product._id);
  }, []);

  useEffect(() => {
    if (selectedCurrency && selectedInventory) {
      const path = `${pathName}?currency=${selectedCurrency._id}&inventory=${selectedInventory._id}`;
      router.push(module ? `${path}&module=${module}` : path, {
        scroll: false,
      });
    }
  }, [selectedCurrency, selectedInventory]);

  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (product) {
      const mainImage = product.imageUrl ?? "";
      const secondaryImages =
        product.secondaryImagesUrls?.filter((url) => url) ?? [];
      const kitproductsImages = product.containedProducts
        .map((product) => product.imageUrl ?? "")
        .filter((image) => image);
      const images = [mainImage, ...kitproductsImages, ...secondaryImages];
      setImages(images.filter((image) => image));
    }
  }, [product]);

  if (!product) {
    return <NoProductPlaceholder />;
  }

  return (
    <div>
      {product && (
        <div>
          <p className="hidden font-bold text-h1-tablet mx-auto xl:block xl:w-[80%] text-center">
            {product.name}
          </p>
        </div>
      )}
      <div
        className="flex flex-col gap-6 xl:max-w-[900px] xl:mx-auto xl:flex-row"
        id="product-details"
      >
        <ProductImages {...{ images }} />
        <div className="flex flex-col gap-6 xl:flex-grow">
          <ProductInfo
            {...{ product }}
            selectedCurrency={selectedCurrency!}
            selectedInventory={selectedInventory!}
            selectedModule={module ? selectedModule! : mainModule!}
          />
          <Button
            variant="outlined"
            startIcon={<IconShoppingBag size={24} />}
            sx={{
              height: "56px",
              borderRadius: "8px",
              borderWidth: "2px",
              padding: "16px",
            }}
            onClick={addProductToCart}
          >
            <p className="text-button uppercase font-bold">Añadir a cesta</p>
          </Button>
        </div>
      </div>
    </div>
  );
}
