"use client";

import { Product } from "@/types/shared";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import PlaceHolderImage from "@public/images/placeholder.webp";
import AtosImage from "@public/images/atos.svg";
import PicantoImage from "@public/images/picanto.svg";
import TicoImage from "@public/images/tico.svg";
import { useCurrencyStore } from "@/stores/currency";
import ProductCardInfo from "./ProductCardInfo";
import { Button } from "@mui/material";
import { IconShoppingBag } from "@tabler/icons-react";
import { useInView } from "react-intersection-observer";
import { useCartStore } from "@/stores/cart";
import { useInventoryStore } from "@/stores/inventory";
import ProductCardKit from "./ProductCardKit";
import { useModuleStore } from "@/stores/module";

type Props = {
  product: Product;
  isInViewportHandler?: () => void;
};

export default function ProductCard({ product, isInViewportHandler }: Props) {
  const selectedCurrency = useCurrencyStore((state) => state.selectedCurrency);
  const selectedInventory = useInventoryStore(
    (state) => state.selectedInventory,
  );
  const selectedModule = useModuleStore((state) => state.selectedModule);
  const { ref } = useInView({
    onChange: (inView) => {
      if (inView.valueOf() && isInViewportHandler) {
        isInViewportHandler();
      }
    },
  });

  const getTopImage = (moduleName: string): StaticImageData | undefined => {
    if (moduleName.includes("atos")) {
      return AtosImage;
    }
    if (moduleName.includes("picanto")) {
      return PicantoImage;
    }
    if (moduleName.includes("tico")) {
      return TicoImage;
    }
    // if (moduleName.includes("sandero")) {
    //   return SanderoImage;
    // }
    // if (moduleName.includes("otros")) {
    //   return OthersImage;
    // }
    return undefined;
  };

  const increaseProduct = useCartStore((state) => state.increaseProduct);
  const addProductToCart = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    if (selectedInventory) {
      increaseProduct(selectedInventory._id, product);
    }
  };

  if (!selectedInventory || !selectedCurrency) {
    return null;
  }

  const topImage = getTopImage(selectedModule!.name);

  return (
    <div
      id={product._id}
      ref={isInViewportHandler ? ref : undefined}
      className="rounded-t-lg w-full flex flex-col shadow-md pb-3 md:max-w-[350px] xl:max-w-[480px]"
    >
      <Link
        href={`/product/${product.code}?currency=${selectedCurrency._id}&inventory=${selectedInventory._id}`}
      >
        <div className="h-[40px] bg-primary rounded-t-lg flex items-center px-4">
          {topImage && (
            <Image src={topImage} alt={selectedModule!.name} height={18} style={{objectFit: "cover"}} />
          )}
        </div>
        <div className="w-full h-[290px] relative">
          <Image
            src={product.imageUrl || PlaceHolderImage}
            alt={product.name}
            style={{ objectFit: product.imageUrl ? "contain" : "cover" }}
            quality={100}
            fill
          />
          {!!product.containedProducts?.length && <ProductCardKit />}
        </div>
        <div className="px-2 pt-3">
          <ProductCardInfo
            product={product}
            selectedCurrency={selectedCurrency!}
          />
        </div>
      </Link>
      <div className="px-2 pt-3">
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
