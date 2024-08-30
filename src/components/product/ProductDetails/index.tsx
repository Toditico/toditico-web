"use client";

import { Currency, Product } from "@/types/shared";
import { useEffect, useState } from "react";
import ProductImages from "./ProductImages";
import ProductInfo from "./ProductInfo";
import { Button } from "@mui/material";
import { IconShoppingBag } from "@tabler/icons-react";
import { useCartStore } from "@/stores/cart";

type Props = {
  product: Product;
  selectedCurrency: Currency;
};

export default function ProductDetails({ product, selectedCurrency }: Props) {
  const increaseProduct = useCartStore((state) => state.increaseProduct);
  const addProductToCart = () => {
    increaseProduct(product);
  };

  const [images, setImages] = useState<string[]>([]);
  useEffect(() => {
    const mainImage = product.imageUrl ?? "";
    const secondaryImages =
      product.secondaryImagesUrls?.filter((url) => url) ?? [];
    const images = [mainImage, ...secondaryImages];
    setImages(images.filter((image) => image));
  }, [product]);
  return (
    <div className="flex flex-col gap-6">
      <ProductImages {...{ images }} />
      <div className="flex flex-col gap-6">
        <ProductInfo {...{ product, selectedCurrency }} />
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
