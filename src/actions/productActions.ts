"use server";

import productService from "@/services/productService";
import { Product } from "@/types/shared";
import { unstable_cache } from "next/cache";

const GET_PRODUCT_DETAILS_REVALIDATE_SECONDS = 90;
const FILTER_PRODUCTS_REVALIDATE_SECONDS = 90;

const getProductDetailsAction = unstable_cache(
  async (code: string, inventory: string, currency: string): Promise<Product> =>
    productService.getDetails(code, inventory, currency),
  undefined,
  { revalidate: GET_PRODUCT_DETAILS_REVALIDATE_SECONDS },
);

const filterProductsAction = unstable_cache(
  async (
    text: string,
    inventoryId: string,
    currencyId: string,
    moduleId: string,
    page: number,
    limit: number,
  ) =>
    productService.filterProducts(
      text,
      inventoryId,
      currencyId,
      moduleId,
      page,
      limit,
    ),
  undefined,
  { revalidate: FILTER_PRODUCTS_REVALIDATE_SECONDS },
);
export { getProductDetailsAction, filterProductsAction };
