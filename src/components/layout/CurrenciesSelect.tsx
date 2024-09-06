"use client";
import { useCurrencyStore } from "@/stores/currency";
import { Currency } from "@/types/shared";
import { TextField, Autocomplete, Skeleton } from "@mui/material";
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
    <Autocomplete
      className="rounded"
      sx={{
        height: "40px",
        width: "96px",
      }}
      disableClearable
      options={currencies}
      getOptionLabel={({ name }) => name}
      isOptionEqualToValue={(option, value) => option._id === value._id}
      value={selectedCurrency!}
      onChange={(event: any, value: Currency) => setSelectedCurrency(value)}
      disabled={currencies.length === 0}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="filled"
          onKeyDown={(e) => {
            e.preventDefault();
            return;
          }}
          sx={{
            height: "40px",
            "& .MuiInputBase-root": {
              height: "40px !important",
              padding: "0px",
              "& .MuiInputBase-input": {
                minWidth: "50px",
              },
            },
          }}
        />
      )}
    />
  ) : (
    <Skeleton variant="rectangular" width={96} height={40} />
  );
}
