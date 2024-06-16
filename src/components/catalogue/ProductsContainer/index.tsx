"use client";

import { Product } from "@/types/shared";
import ProductCard from "./ProductCard/";
import { Skeleton } from "@mui/material";

type Props = {
  products: Product[];
  isLoading: boolean;
  fetchNextPage: () => void;
};

export default function ProductsContainer({
  products,
  isLoading,
  fetchNextPage,
}: Props) {
  return (
    <div className="flex flex-col gap-4 px-6 pb-4">
      {products.map((product, index) => (
        <ProductCard
          product={product}
          key={product._id}
          isInViewportHandler={
            index === products.length - 2 ? fetchNextPage : undefined
          }
        />
      ))}
      {isLoading && (
        <Skeleton variant="rectangular" height={360} width={"100%"} />
      )}
    </div>
  );
}
