"use client";

import { Product } from "@/types/shared";
import ProductCard from "./ProductCard/";
import { Skeleton } from "@mui/material";

type Props = {
  products: Product[];
  isLoading?: boolean;
  maxPage: number;
  fetchNextPage: () => void;
};

export default function ProductsContainer({
  products,
  fetchNextPage,
  isLoading = false,
}: Props) {
  return (
    <div className="flex flex-col gap-4 px-6 pb-4 md:flex-row md:flex-wrap md:justify-around xl:px-2">
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
