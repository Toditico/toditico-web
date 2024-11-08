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
import { usePathname, useRouter } from "next/navigation";

type Props = {
  product: Product;
};

export default function ProductDetails({ product }: Props) {
  const increaseProduct = useCartStore((state) => state.increaseProduct);
  const selectedCurrency = useCurrencyStore((state) => state.selectedCurrency);
  const selectedInventory = useInventoryStore(
    (state) => state.selectedInventory,
  );
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathName = usePathname();

  const addProductToCart = () => {
    if (selectedInventory) {
      increaseProduct(selectedInventory._id, product);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      const element = document.getElementById("product-details");
      if (element) {
        const offsetTop = element.offsetTop - 120; //Adjust in case of tablet and desktop
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    }, 100);
  }, []);

  useEffect(() => {
    setLoading(!selectedCurrency);
  }, [selectedCurrency]);

  useEffect(() => {
    if (selectedCurrency && selectedInventory) {
      router.push(
        `${pathName}?currency=${selectedCurrency._id}&inventory=${selectedInventory._id}`,
        { scroll: false },
      );
    }
  }, [selectedCurrency, selectedInventory]);

  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const mainImage = product.imageUrl ?? "";
    const secondaryImages =
      product.secondaryImagesUrls?.filter((url) => url) ?? [];
    const images = [mainImage, ...secondaryImages];
    setImages(images.filter((image) => image));
  }, [product]);

  return (
    <div className="flex flex-col gap-6" id="product-details">
      <ProductImages {...{ images }} />
      <div className="flex flex-col gap-6">
        <ProductInfo
          {...{ product }}
          selectedCurrency={selectedCurrency!}
          selectedInventory={selectedInventory!}
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
        >
          <p
            className="text-button uppercase font-bold"
            onClick={addProductToCart}
          >
            Añadir a cesta
          </p>
        </Button>
      </div>
    </div>
  );
}
