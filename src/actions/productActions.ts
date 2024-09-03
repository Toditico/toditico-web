"use server";

import productService from "@/services/productService";
import { Product } from "@/types/shared";

const getProductDetailsAction = async (
  code: string,
  inventory: string,
  currency: string,
): Promise<Product> => {
  const product = await productService.getDetails(code, inventory, currency);
  return product;
};

export { getProductDetailsAction };
