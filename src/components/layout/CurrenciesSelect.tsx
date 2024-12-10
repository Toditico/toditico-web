"use client";
import { useCurrencyStore } from "@/stores/currency";
import { Skeleton, Select, SelectChangeEvent, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";

export default function CurrenciesSelect() {
  const currencies = useCurrencyStore((state) => state.currencies);
  const selectedCurrency = useCurrencyStore((state) => state.selectedCurrency);
  const setSelectedCurrency = useCurrencyStore(
    (state) => state.setSelectedCurrency,
  );

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(selectedCurrency ? false : true);
  }, [selectedCurrency]);

  return !isLoading ? (
    <Select
      className="rounded"
      sx={{
        height: "40px",
        width: "96px",
        alignItems: "flex-end",
        ".MuiSelect-select.MuiSelect-filled": {
          "&:focus": {
            backgroundColor: "transparent",
          },
        },
      }}
      variant="filled"
      value={JSON.stringify(selectedCurrency!)}
      onChange={(event: SelectChangeEvent<string>) =>
        setSelectedCurrency(JSON.parse(event.target.value as string))
      }
      disabled={currencies.length === 0}
    >
      {currencies.map((currency) => (
        <MenuItem key={currency._id} value={JSON.stringify(currency)}>
          {currency.name}
        </MenuItem>
      ))}
    </Select>
  ) : (
    <Skeleton variant="rectangular" width={96} height={40} />
  );
}
