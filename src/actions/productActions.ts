"use server";

import productService from "@/services/productService";
import { FilterProductsType, Product } from "@/types/shared";
import { normalizeProductsData } from "@/utils/products";
import { unstable_cache } from "next/cache";

const GET_PRODUCT_DETAILS_REVALIDATE_SECONDS = 90;
const FILTER_PRODUCTS_REVALIDATE_SECONDS = 90;
const AUTOCOMPLETE_PRODUCTS_REVALIDATE_SECONDS = 60;

const getProductsDetailsAction = async (
  codes: string[],
  inventory: string,
  currency: string,
): Promise<Product[]> => {
  const products = await productService.getDetails(codes, inventory, currency);
  return normalizeProductsData(products);
};

const filterProductsAction = async (
  text: string,
  inventoryId: string,
  currencyId: string,
  moduleId: string,
  page: number,
  limit: number,
): Promise<FilterProductsType> => {
  const { result, paginationInfo } = await productService.filterProducts(
    text.trim(),
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
};

const getProductsAutocompleteAction = async (
  text: string,
  inventoryId: string,
  currencyId: string,
): Promise<Product[]> => {
  const data = await productService.getAutocomplete(
    text.trim(),
    inventoryId,
    currencyId,
  );
  return normalizeProductsData(data);
};

export {
  getProductsDetailsAction,
  filterProductsAction,
  getProductsAutocompleteAction,
};
