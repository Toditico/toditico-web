"use client";

import { Product } from "@/types/shared";
import ProductCard from "./ProductCard/";

type Props = {
  products: Product[];
};

export default function ProductsContainer({ products }: Props) {
  return (
    <div className="flex flex-col gap-4 px-6">
      {products.map((product) => (
        <ProductCard product={product} key={product._id} />
      ))}
    </div>
  );
}
