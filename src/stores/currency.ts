import { Currency } from "@/types/shared";
import { create } from "zustand";

type CurrencyState = {
  currencies: Currency[];
  selectedCurrency: Currency | null;
  setSelectedCurrency: (currency: Currency) => void;
  setCurrencies: (currencies: Currency[]) => void;
};

const initialSelectedCurrency = (): Currency | null => {
  const storageCurrency = localStorage.getItem("currency");
  return storageCurrency ? JSON.parse(storageCurrency) : null;
};

export const useCurrencyStore = create<CurrencyState>((set) => ({
  currencies: [],
  selectedCurrency: initialSelectedCurrency(),
  setSelectedCurrency: (currency) =>
    set(() => {
      localStorage.setItem("currency", JSON.stringify(currency));
      return { selectedCurrency: currency };
    }),
  setCurrencies: (currencies) =>
    set((state) => {
      const { selectedCurrency } = state;
      console.log("selected currency: ", selectedCurrency);
      !selectedCurrency &&
        localStorage.setItem("currency", JSON.stringify(currencies[0]));
      return {
        currencies,
        selectedCurrency: selectedCurrency ?? currencies[0],
      };
    }),
}));
