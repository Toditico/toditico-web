"use client";

import { IconChevronDown } from "@tabler/icons-react";
import { colors } from "@/constants/colors";
import { Inventory } from "@/types/shared";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import { IconFilter } from "@tabler/icons-react";
import { useEffect, useState } from "react";

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
      onKeyDown={(e) => {
        if (e.code === "Enter") {
          onSearch(productName);
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
          className="flex-grow"
          placeholder="Nombre"
          type="search"
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
