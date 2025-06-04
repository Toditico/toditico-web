"use client";

import { IconChevronDown } from "@tabler/icons-react";
import { colors } from "@/constants/colors";
import { Inventory } from "@/types/shared";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import { IconFilter } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";

type Props = {
  inventories: Inventory[];
  selectedInventory: string;
  selectedQuery: string;
  isLoading?: boolean;
  onSearch: (userInput: string) => void;
  onSelectedInventory: (selectedInventory: string, userInput: string) => void;
};

export default function Filters({
  inventories,
  selectedInventory,
  selectedQuery,
  onSearch,
  onSelectedInventory,
}: Props) {
  const [inventory, setInventory] = useState<string>("");
  const [productName, setProductName] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setProductName(selectedQuery);
  }, [selectedQuery]);

  useEffect(() => {
    if (selectedInventory) {
      setInventory(selectedInventory);
    }
  }, [selectedInventory]);

  return (
    <div
      className="flex flex-col p-6 gap-4 md:flex-row"
      id="filters"
      onKeyDown={(e) => {
        if (e.code === "Enter" || e.key === "Enter") {
          onSearch(productName);
          inputRef.current?.blur();
        }
      }}
    >
      <>
        <Select
          className="flex-grow"
          placeholder="Inventario"
          value={inventory}
          onChange={(el) => {
            setInventory(el.target.value);
            onSelectedInventory(el.target.value, productName);
          }}
          IconComponent={IconChevronDown}
          sx={{
            height: "56px",
            borderRadius: "8px",
            fontSize: "16px",
            lineHeight: "21.6px",
            borderWidth: "2px",
            borderColor: colors.primary,
            color: colors.primary,
            backgroundColor: colors.primaryLight,
            "&.Mui-focused": {
              border: "none",
            },
            "> fieldset.MuiOutlinedInput-notchedOutline": {
              display: "none",
            },
            ".MuiSelect-icon": {
              color: colors.primary,
            },
          }}
        >
          {inventories.map((inventory) => (
            <MenuItem key={inventory.name} value={inventory._id}>
              {inventory.name}
            </MenuItem>
          ))}
        </Select>

        <TextField
          inputRef={inputRef}
          className="flex-grow"
          placeholder="Nombre"
          type="search"
	  autoComplete="off"
          value={productName}
          onChange={(event) => setProductName(event.target.value)}
          InputProps={{
            ...{
              sx: {
                height: "56px",
                borderRadius: "8px",
                fontSize: "16px",
                lineHeight: "21.6px",
                borderWidth: "2px",
                borderColor: colors.primary,
                color: colors.primary,
                "&.MuiOutlinedInput-notchedOutline": {
                  borderWidth: "0px",
                },
                "> fieldset.MuiOutlinedInput-notchedOutline": {
                  display: "none",
                },
                '& input[type="search"]::-webkit-search-cancel-button': {
                  cursor: "pointer",
                  filter:
                    "invert(24%) sepia(85%) saturate(3055%) hue-rotate(358deg) brightness(90%) contrast(101%)",
                },
                "& .MuiInputBase-input:-webkit-autofill, & .MuiInputBase-input:-webkit-autofill:hover, & .MuiInputBase-input:-webkit-autofill:focus, & .MuiInputBase-input:-webkit-autofill:active":
                  {
                    "-webkit-box-shadow": `0 0 0 30px ${colors.white || "white"} inset !important`,
                    "-webkit-text-fill-color": `${colors.primary} !important`,
                    borderRadius: "8px",
                    caretColor: colors.primary,
                    border: "none !important",
                    backgroundColor: "transparent !important",
                  },
                "& input:-webkit-autofill, & input:-webkit-autofill:hover, & input:-webkit-autofill:focus, & input:-webkit-autofill:active":
                  {
                    "-webkit-box-shadow": `0 0 0 30px ${colors.white || "white"} inset !important`,
                    "-webkit-text-fill-color": `${colors.primary} !important`,
                    borderRadius: "inherit",
                    caretColor: colors.primary,
                    borderWidth: "2px",
                    border: "none !important",
                  },
              },
            },
          }}
        />

        <Button
          className="h-[56px] rounded-lg p-4 uppercase font-bold text-button"
          variant="contained"
          startIcon={<IconFilter size={24} />}
          onClick={() => onSearch(productName)}
        >
          Filtrar
        </Button>
      </>
    </div>
  );
}
