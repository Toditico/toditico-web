"use client";
import { Currency, Product } from "@/types/shared";
import ProductCardPrice from "./ProductCardPrice";
import ProductCardStatus from "./ProductStatus";
import { renderTextWithLinks } from "@/utils/text";
import ProductCardKit from "./ProductCardKit";

type Props = {
  product: Product;
  selectedCurrency: Currency;
};

export default function ProductCardInfo({ product, selectedCurrency }: Props) {
  return (
    <div className="flex flex-col gap-4 px-4 pb-4">
      <div className="flex gap-2 items-center">
        {!!product?.containedProducts?.length && <ProductCardKit />}
        <ProductCardStatus productStatus={product.status} />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-small font-bold xl:font-bold xl:text-h3-desktop xl:h-[65px]">
          {product.name}
        </p>
        <div className="md:h-[32.4px]">
          {product.description &&
            renderTextWithLinks(
              product.description,
              "text-small line-clamp-2 xl:text-body",
            )}
        </div>
      </div>
      <div className="flex items-center">
        <ProductCardPrice
          originalPrice={product.sellPrice}
          finalPrice={product.finalPrice}
          discount={product.discountPercent}
          selectedCurrency={selectedCurrency}
        />
      </div>
    </div>
  );
}
