import { colors } from "@/constants/colors";
import clientProductService from "@/services/clientProductsService";
import { useInventoryStore } from "@/stores/inventory";
import { Product } from "@/types/shared";
import { InputAdornment, TextField, Autocomplete } from "@mui/material";
import { IconSearch } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import ProductsAutocompleteOption from "./ProductAutocompleteOption";

export default function ProductsAutocomplete() {
  const [value, setValue] = useState<string>("");
  const [options, setOptions] = useState<Product[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

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

  useEffect(() => {
    console.log("options changed: ", options);
  }, [options]);

  useEffect(() => {
    if (!value) {
      return;
    }
    const fetchProducts = async () => {
      const products = await clientProductService.getAutocomplete(
        value,
        selectedInventory!._id
      );
      setOptions(products);
    };
    fetchProducts();
  }, [value]);

  const selectedProduct = (product: Product) => {
    console.log("clicked product: ", product);
  };

  return (
    <Autocomplete
      className="rounded w-[calc(100%-100px)] xl:w-[500px]"
      sx={{
        height: "40px",
      }}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      forcePopupIcon={false}
      popupIcon={false}
      getOptionLabel={(product) => product.name}
      onFocus={checkIfThereIsAnyInventorySelected}
      disabled={inventories.length === 0}
      onInputChange={(event, inputValue) => {
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
          setValue(inputValue);
        }, 1000);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="filled"
          type="search"
          sx={{ height: "40px" }}
          placeholder="Buscar"
          fullWidth
          InputProps={{
            ...params.InputProps,
            ...{
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
            },
          }}
        />
      )}
      renderOption={(props, product) => {
        return (
          <ProductsAutocompleteOption
            {...{ props }}
            key={product._id}
            onClick={selectedProduct}
            product={product}
          />
        );
      }}
    />
  );
}
