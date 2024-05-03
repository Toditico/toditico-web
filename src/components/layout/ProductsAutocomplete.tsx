import { colors } from "@/constants/colors";
import { InputAdornment, TextField, Autocomplete } from "@mui/material";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";

export default function ProductsAutocomplete() {
  const [options, setOptions] = useState<any[]>([]);
  return (
    <Autocomplete
      className="rounded"
      sx={{
        height: "40px",
      }}
      filterOptions={(x) => x}
      forcePopupIcon={false}
      popupIcon={false}
      autoComplete
      filterSelectedOptions
      includeInputInList
      {...{ options }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="filled"
          type="search"
          sx={{ height: "40px" }}
          InputProps={{
            placeholder: "Buscar",
            sx: { height: "40px", paddingTop: "0 !important" },
            startAdornment: (
              <InputAdornment
                className="testing"
                position="start"
                style={{ marginTop: 0 }}
              >
                <IconSearch color={colors.primary} />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
}
