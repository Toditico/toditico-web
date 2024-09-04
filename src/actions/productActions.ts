"use server";

import productService from "@/services/productService";
import { Product } from "@/types/shared";

const getProductDetailsAction = async (
  code: string,
  inventory: string,
  currency: string,
): Promise<Product> => {
  return productService.getDetails(code, inventory, currency);
};

const filterProductsAction = async (
  text: string,
  inventoryId: string,
  currencyId: string,
  moduleId: string,
  page: number,
  limit: number,
) => {
  return productService.filterProducts(
    text,
    inventoryId,
    currencyId,
    moduleId,
    page,
    limit,
  );
};

export { getProductDetailsAction, filterProductsAction };
