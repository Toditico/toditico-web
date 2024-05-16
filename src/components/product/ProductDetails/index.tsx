"use client";

import { Product } from "@/types/shared";
import { useEffect, useState } from "react";
import ProductImages from "./ProductImages";
import ProductInfo from "./ProductInfo";
import { Button } from "@mui/material";
import { IconShoppingBag } from "@tabler/icons-react";

type Props = {
  product: Product;
};
export default function ProductDetails({ product }: Props) {
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
        <ProductInfo {...{ product }} />
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
          <p className="text-button uppercase font-bold">Añadir a cesta</p>
        </Button>
      </div>
    </div>
  );
}
