import { useCurrencyStore } from "@/stores/currency";
import { Currency } from "@/types/shared";
import { TextField, Autocomplete } from "@mui/material";

export default function CurrenciesSelect() {
  const currencies = useCurrencyStore((state) => state.currencies);
  const selectedCurrency = useCurrencyStore((state) => state.selectedCurrency);
  const setSelectedCurrency = useCurrencyStore(
    (state) => state.setSelectedCurrency
  );

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
      isOptionEqualToValue={(option, value) => option._id === value._id}
      value={selectedCurrency ?? null}
      onChange={(event: any, value: Currency) => setSelectedCurrency(value)}
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
