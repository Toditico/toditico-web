import { Inventory, Workshop } from "@/types/shared";
import { capitalizeAllWordsButPreps } from "./strings";

export const normalizeInventoriesAndWorkshosData = (
  items: Inventory[] | Workshop[],
) => {
  return items.map(({ name, address, ...otherProps }) => {
    return {
      name: capitalizeAllWordsButPreps(name),
      address: capitalizeAllWordsButPreps(address ?? ""),
      ...otherProps,
    };
  });
};
