"use client";

import { Product } from "@/types/shared";
import Image from "next/image";
import PlaceHolderImage from "@public/images/placeholder.webp";
import { useCurrencyStore } from "@/stores/currency";
import ProductCardInfo from "./ProductCardInfo";
import { Button } from "@mui/material";
import { IconShoppingBag } from "@tabler/icons-react";
import { useInView } from "react-intersection-observer";
import { useCartStore } from "@/stores/cart";
import { useInventoryStore } from "@/stores/inventory";

type Props = {
  product: Product;
  isInViewportHandler?: () => void;
};

export default function ProductCard({ product, isInViewportHandler }: Props) {
  const selectedCurrency = useCurrencyStore((state) => state.selectedCurrency);
  const selectedInventory = useInventoryStore((state) => state.selectedInventory);
  const { ref } = useInView({
    onChange: (inView) => {
      if (inView.valueOf() && isInViewportHandler) {
        isInViewportHandler();
      }
    },
  });

  const increaseProduct = useCartStore((state) => state.increaseProduct);
  const addProductToCart = () => {
    increaseProduct(product);
  };

  return (
    <div
      ref={isInViewportHandler ? ref : undefined}
      className="rounded-t-lg w-full flex flex-col shadow-md pb-3"
    >
      <div className="h-[40px] bg-primary rounded-t-lg"></div>
      <div className="w-full h-[260px] relative">
        <Image
          src={product.imageUrl || PlaceHolderImage}
          alt={product.name}
          style={{ objectFit: "cover" }}
          fill
        />
      </div>
      <div className="px-2 pt-3">
        <ProductCardInfo
          product={product}
          selectedCurrency={selectedCurrency!}
	  selectedInventory={selectedInventory!}
        />
        <Button
          variant="outlined"
          startIcon={<IconShoppingBag size={24} />}
          sx={{
            width: "100%",
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
  );
}
