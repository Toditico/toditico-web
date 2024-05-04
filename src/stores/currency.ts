import { Currency } from "@/types/shared";
import { create } from "zustand";

type CurrencyState = {
  currencies: Currency[];
  selectedCurrency?: Currency;
  setSelectedCurrency: (currency: Currency) => void;
  setCurrencies: (currencies: Currency[]) => void;
};

export const useCurrencyStore = create<CurrencyState>((set) => ({
  currencies: [],
  setSelectedCurrency: (currency) =>
    set(() => {
      return { selectedCurrency: currency };
    }),
  setCurrencies: (currencies) =>
    set((state) => {
      const { selectedCurrency } = state;
      return {
        currencies,
        selectedCurrency: selectedCurrency ?? currencies[0],
      };
    }),
}));
