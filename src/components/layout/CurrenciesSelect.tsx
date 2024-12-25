"use client";
import { colors } from "@/constants/colors";
import { useCurrencyStore } from "@/stores/currency";
import { Skeleton, Select, SelectChangeEvent, MenuItem } from "@mui/material";
import { IconChevronDown } from "@tabler/icons-react";
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
      sx={{
        height: "40px",
        width: "96px",
        alignItems: "flex-end",
	borderRadius: "8px",
        color: colors.primary,
        ":before": {
          borderBottomColor: "transparent",
        },
        ".MuiSelect-select.MuiSelect-filled": {
          "&:focus": {
            backgroundColor: "transparent",
          },
        },
      }}
      IconComponent={(props) => (
        <IconChevronDown
          {...props}
          style={{
            color: colors.primary,
            fontSize: "1.2rem",
            ...props.style,
          }}
        />
      )}
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
