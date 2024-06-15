"use client";

import { Product } from "@/types/shared";
import ProductCard from "./ProductCard/";
import { Skeleton } from "@mui/material";

type Props = {
  products: Product[];
  isLoading: boolean;
};

export default function ProductsContainer({ products, isLoading }: Props) {
  return (
    <div className="flex flex-col gap-4 px-6 pb-4">
      {products.map((product) => (
        <ProductCard product={product} key={product._id} />
      ))}
      {isLoading && (
        <Skeleton variant="rectangular" height={360} width={"100%"} />
      )}
    </div>
  );
}
