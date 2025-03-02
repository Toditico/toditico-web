import { breakpoints } from "@/constants/breakpoints";
import { colors } from "@/constants/colors";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useCurrencyStore } from "@/stores/currency";
import { useInventoryStore } from "@/stores/inventory";
import { Product } from "@/types/shared";
import {
  InputAdornment,
  TextField,
  Autocomplete,
  CircularProgress,
  Skeleton,
} from "@mui/material";
import { IconSearch } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import ProductsAutocompleteOption from "./ProductAutocompleteOption";
import { getProductsAutocompleteAction } from "@/actions/productActions";

export default function ProductsAutocomplete() {
  const [value, setValue] = useState<string>("");
  const [options, setOptions] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [noOptionsText, setNoOptionsText] = useState<string>(
    "Inserte al menos tres caracteres",
  );
  const { width } = useWindowSize();
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const inventories = useInventoryStore((state) => state.inventories);
  const setOpenSelectionModal = useInventoryStore(
    (state) => state.setOpenSelectionModal,
  );
  const selectedInventory = useInventoryStore(
    (state) => state.selectedInventory,
  );
  const selectedCurrency = useCurrencyStore((state) => state.selectedCurrency);
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
    if (!value) {
      return;
    }
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const products = await getProductsAutocompleteAction(
          value,
          selectedInventory!._id,
          selectedCurrency!._id,
        );
        setOptions(products);
        !products.length &&
          setNoOptionsText("No se encontraron resultados para su búsqueda");
      } catch (error) {
        setOptions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [value]);

  const selectedProduct = () => {
    setOptions([]);
    setValue("");
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  return inventories.length && selectedCurrency ? (
    <Autocomplete
      className="w-[calc(100%-100px)] xl:w-[500px]"
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
      noOptionsText={noOptionsText}
      loading={loading}
      loadingText=<div className="flex items-center gap-2">
        <CircularProgress size={16} />
        Por favor espere...
      </div>
      disabled={inventories.length === 0}
      onInputChange={(event, inputValue) => {
        clearTimeout(timerRef.current);
        if (inputValue.length < 3) {
          setNoOptionsText("Inserte al menos tres caracteres");
          return;
        }
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
              sx: {
                height: "40px",
                paddingTop: "0 !important",
                borderRadius: "8px",
                ":before": {
                  borderBottomColor: "transparent",
                },
                "input::placeholder": {
                  color: colors.primary,
                  opacity: 0.7,
                  position: "relative",
                  top: "2px",
                  right: "2px",
                },
              },
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
          <div className="relative" key={product._id}>
            <ProductsAutocompleteOption
              {...{ props }}
              onClick={selectedProduct}
              product={product}
              selectedCurrency={selectedCurrency}
              selectedInventory={selectedInventory!}
            />
          </div>
        );
      }}
    />
  ) : (
    <Skeleton variant="rectangular" width={262} height={40}></Skeleton>
  );
}
