import { breakpoints } from "@/constants/breakpoints";
import { colors } from "@/constants/colors";
import { useWindowSize } from "@/hooks/useWindowSize";
import clientProductService from "@/services/clientProductsService";
import { useInventoryStore } from "@/stores/inventory";
import { Product } from "@/types/shared";
import {
  InputAdornment,
  TextField,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import { IconSearch } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import ProductsAutocompleteOption from "./ProductAutocompleteOption";

export default function ProductsAutocomplete() {
  const [value, setValue] = useState<string>("");
  const [options, setOptions] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { width } = useWindowSize();
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

  const clearOptions = () => {
    setOptions([]);
  };

  useEffect(() => {
    console.log("options changed: ", options);
  }, [options]);

  useEffect(() => {
    if (!value) {
      return;
    }
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const products = await clientProductService.getAutocomplete(
          value,
          selectedInventory!._id
        );
        setOptions(products);
      } catch (error) {
        setOptions([]);
      } finally {
        setLoading(false);
      }
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
      onBlur={clearOptions}
      noOptionsText="Inserte al menos 3 caracteres"
      loading={loading}
      loadingText=<div className="flex items-center gap-2">
        <CircularProgress size={16} />
        Por favor espere...
      </div>
      disabled={inventories.length === 0}
      onInputChange={(event, inputValue) => {
        clearTimeout(timerRef.current);
        if (!inputValue) {
          setValue("");
          setOptions([]);
          return;
        }
        timerRef.current = setTimeout(() => {
          setValue(inputValue);
        }, 1000);
      }}
      componentsProps={{
        paper: {
          sx: {
            width:
              width < breakpoints.tablet
                ? "90vw"
                : width < breakpoints.desktop
                ? undefined
                : "600px",
          },
        },
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
                <InputAdornment position="start" style={{ marginTop: 0 }}>
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
