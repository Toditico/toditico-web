import { colors } from "@/constants/colors";
import clientProductService from "@/services/clientProductsService";
import { useInventoryStore } from "@/stores/inventory";
import { Product } from "@/types/shared";
import { InputAdornment, TextField, Autocomplete } from "@mui/material";
import { IconSearch } from "@tabler/icons-react";
import { useMemo, useState } from "react";
import { debounce } from "@mui/material/utils";

export default function ProductsAutocomplete() {
  const [value, setValue] = useState<string>("");
  const [options, setOptions] = useState<Product[]>([]);
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
    setOpenSelectionModal(true);
  };
  const fetchProducts = useMemo(() => {
    return debounce(async () => {
      const products = await clientProductService.getAutocomplete(
        value,
        selectedInventory!._id
      );
    }, 1000);
  }, [selectedInventory]);

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
      onInputChange={(event, inputValue) => {
        setValue(inputValue);
        fetchProducts();
      }}
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
