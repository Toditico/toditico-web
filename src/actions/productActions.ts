"use server";

import productService from "@/services/productService";
import { FilterProductsType, Product } from "@/types/shared";
import { normalizeProductsData } from "@/utils/products";
import { unstable_cache } from "next/cache";

const GET_PRODUCT_DETAILS_REVALIDATE_SECONDS = 90;
const FILTER_PRODUCTS_REVALIDATE_SECONDS = 90;

const getProductDetailsAction = unstable_cache(
  async (
    code: string,
    inventory: string,
    currency: string,
  ): Promise<Product> => {
    const product = await productService.getDetails(code, inventory, currency);
    return normalizeProductsData([product])[0];
  },
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
  ): Promise<FilterProductsType> => {
    const { result, paginationInfo } = await productService.filterProducts(
      text,
      inventoryId,
      currencyId,
      moduleId,
      page,
      limit,
    );
    return {
      result: normalizeProductsData(result),
      paginationInfo,
    };
  },
  undefined,
  { revalidate: FILTER_PRODUCTS_REVALIDATE_SECONDS },
);
export { getProductDetailsAction, filterProductsAction };
