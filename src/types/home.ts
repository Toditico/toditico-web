import { Currency, Inventory, Workshop } from "./shared";

export type Stats = {
  customers: number;
  sales: number;
  products: number;
};

export type HomeResponse = {
  stats: Stats;
  inventories: Inventory[];
  workshops: Workshop[];
  currencies: Currency[];
};
