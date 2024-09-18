"use server";

import productService from "@/services/productService";
import { FilterProductsType, Product } from "@/types/shared";
import { normalizeProductsData } from "@/utils/products";
import { unstable_cache } from "next/cache";

const GET_PRODUCT_DETAILS_REVALIDATE_SECONDS = 90;
const FILTER_PRODUCTS_REVALIDATE_SECONDS = 90;
const AUTOCOMPLETE_PRODUCTS_REVALIDATE_SECONDS = 60;

const getProductsDetailsAction = unstable_cache(
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

const getProductsAutocompleteAction = unstable_cache(
  async (
    text: string,
    inventoryId: string,
    currencyId: string,
  ): Promise<Product[]> => {
    const data = await productService.getAutocomplete(
      text,
      inventoryId,
      currencyId,
    );
    return normalizeProductsData(data);
  },
  undefined,
  { revalidate: AUTOCOMPLETE_PRODUCTS_REVALIDATE_SECONDS },
);

export {
  getProductsDetailsAction,
  filterProductsAction,
  getProductsAutocompleteAction,
};
