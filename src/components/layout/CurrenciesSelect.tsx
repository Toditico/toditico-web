import { Currency } from "@/types/shared";
import { TextField, Autocomplete } from "@mui/material";
import { useState } from "react";

export default function CurrenciesSelect() {
  const [currencies, setCurrencies] = useState<Currency[]>([
    { name: "USD", exchangeFactor: 1, _id: "1" },
    { name: "CUP", exchangeFactor: 390, _id: "2" },
  ]);
  return (
    <Autocomplete
      className="rounded"
      sx={{
        height: "40px",
        width: "96px",
      }}
      disableClearable
      options={currencies}
      getOptionLabel={({ name }) => name}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="filled"
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
  );
}
