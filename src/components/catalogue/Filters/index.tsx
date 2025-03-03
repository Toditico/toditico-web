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
  onFilter: (userInput: string, userSelectedInventory: string) => void;
};

export default function Filters({
  inventories,
  selectedInventory,
  selectedQuery,
  onFilter,
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
          onFilter(productName, inventory);
        }
      }}
    >
      <>
        <Select
          className="flex-grow"
          placeholder="Inventario"
          value={inventory}
          onChange={(el) => setInventory(el.target.value)}
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
                "&.Mui-focused": {
                  border: "none",
                },
                "&.MuiOutlinedInput-notchedOutline": {
                  borderWidth: "0px",
                },
                "> fieldset.MuiOutlinedInput-notchedOutline": {
                  display: "none",
                },
              },
            },
          }}
        />

        <Button
          className="h-[56px] rounded-lg p-4 uppercase font-bold text-button"
          variant="contained"
          startIcon={<IconFilter size={24} />}
          onClick={() => onFilter(productName, inventory)}
        >
          Filtrar
        </Button>
      </>
    </div>
  );
}
