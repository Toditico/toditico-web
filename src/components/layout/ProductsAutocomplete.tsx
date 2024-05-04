import { colors } from "@/constants/colors";
import { useInventoryStore } from "@/stores/inventory";
import { InputAdornment, TextField, Autocomplete } from "@mui/material";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";

export default function ProductsAutocomplete() {
  const [options, setOptions] = useState<any[]>([]);
  const inventories = useInventoryStore((state) => state.inventories);
  const setOpenSelectionModal = useInventoryStore(
    (state) => state.setOpenSelectionModal
  );
  const selectedInventory = useInventoryStore(
    (state) => state.selectedInventory
  );
  const checkIfThereIsAnyInventorySelected = () => {
    if (selectedInventory) {
      return;
    }
    setOpenSelectionModal(true)
  };
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
      onFocus={checkIfThereIsAnyInventorySelected}
      {...{ options }}
      disabled={inventories.length === 0}
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
