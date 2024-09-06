import { Product } from "@/types/shared";
import { twoFixedPlacesIfFloat } from "./numbers";
import {
  capitalizeAllWordsButPreps,
  capitalizeFirstAndSpecified,
} from "./strings";

export const normalizeProductsData = (products: Product[]) => {
  return products.map(
    ({ sellPrice, finalPrice, name, description, ...otherProps }) => {
      return {
        sellPrice: twoFixedPlacesIfFloat(sellPrice),
        finalPrice: twoFixedPlacesIfFloat(finalPrice),
        name: capitalizeAllWordsButPreps(name),
        description: capitalizeFirstAndSpecified(description ?? ""),
        ...otherProps,
      };
    },
  );
};
