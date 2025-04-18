import { localStorageIDs } from "@/constants/localStorage";
import { Currency } from "@/types/shared";
import { create } from "zustand";

type CurrencyState = {
  currencies: Currency[];
  selectedCurrency: Currency | null;
  setSelectedCurrency: (currency: Currency) => void;
  setCurrencies: (currencies: Currency[]) => void;
};

const initialSelectedCurrency = (): Currency | null => {
  if (typeof window === "undefined") {
    return null;
  }
  const storageCurrency = localStorage.getItem(localStorageIDs.currency);
  return storageCurrency ? JSON.parse(storageCurrency) : null;
};

export const useCurrencyStore = create<CurrencyState>((set) => ({
  currencies: [],
  selectedCurrency: initialSelectedCurrency(),
  setSelectedCurrency: (currency) =>
    set(() => {
      localStorage.setItem(localStorageIDs.currency, JSON.stringify(currency));
      return { selectedCurrency: currency };
    }),
  setCurrencies: (currencies) =>
    set((state) => {
      const { selectedCurrency } = state;
      !selectedCurrency &&
        localStorage.setItem(localStorageIDs.currency, JSON.stringify(currencies[0]));
      return {
        currencies,
        selectedCurrency: selectedCurrency ?? currencies[0],
      };
    }),
}));
