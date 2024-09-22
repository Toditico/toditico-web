"use server";

import productService from "@/services/productService";
import { Product } from "@/types/shared";
import { normalizeProductsData } from "@/utils/products";
import { unstable_cache } from "next/cache";

const REFRESH_CART_PRODUCTS_REVALIDATE_SECONDS = false;

const refreshCartProductsAction = unstable_cache(
  async (
    codes: string[],
    inventory: string,
    currency: string,
  ): Promise<Product[]> => {
    const products = await productService.getDetails(
      codes,
      inventory,
      currency,
    );
    return normalizeProductsData(products);
  },
  undefined,
  { revalidate: REFRESH_CART_PRODUCTS_REVALIDATE_SECONDS },
);

export { refreshCartProductsAction };
