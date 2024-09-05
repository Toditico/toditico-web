import { Product } from "@/types/shared";
import { twoFixedPlacesIfFloat } from "./numbers";

export const normalizeProductsData = (products: Product[]) => {
	return products.map(({sellPrice, finalPrice, ...otherProps}) => {
		return {
			sellPrice: twoFixedPlacesIfFloat(sellPrice),
			finalPrice: twoFixedPlacesIfFloat(finalPrice),
			...otherProps
		}
	})
}
