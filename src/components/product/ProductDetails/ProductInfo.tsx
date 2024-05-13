"use client";
import { Product } from "@/types/shared";
import ProductPrice from "./ProductPrice";

type Props = {
  product: Product;
};

export default function ProductInfo({ product }: Props) {
  // INFO Need to add the kit section and the product status
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <p className="text-h3-desktop font-bold">{product.name}</p>
        {product.description && (
          <p className="text-body">{product.description}</p>
        )}
      </div>
      <hr />
      <ProductPrice finalPrice={product.sellPrice} />
    </div>
  );
}
