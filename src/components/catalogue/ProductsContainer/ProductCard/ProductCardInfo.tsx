"use client";
import { Currency, Product } from "@/types/shared";
import Link from "next/link";
import ProductCardPrice from "./ProductCardPrice";
import ProductCardStatus from "./ProductStatus";

type Props = {
  product: Product;
  selectedCurrency: Currency;
};

export default function ProductCardInfo({ product, selectedCurrency }: Props) {
  // INFO Need to add the kit section and the product status
  return (
    <div className="flex flex-col gap-4 px-4 pb-4">
      <ProductCardStatus productStatus={product.status} />
      <div className="flex flex-col gap-2">
        <p className="text-small font-bold">{product.name}</p>
        {product.description && (
          <p className="text-small">{product.description}</p>
        )}
      </div>
      <div className="flex justify-between items-center">
        <ProductCardPrice
          finalPrice={product.sellPrice}
          selectedCurrency={selectedCurrency}
        />
        <Link href={`/product/${product.code}`}>
          <p className="text-button text-primary uppercase font-bold">
            Ver Detalles <span className="font-bold">&#8594;</span>
          </p>
        </Link>
      </div>
    </div>
  );
}
