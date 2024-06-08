"use client";

import { colors } from "@/constants/colors";
import { Inventory } from "@/types/shared";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import { IconFilter } from "@tabler/icons-react";
import { useState } from "react";

type Props = {
  inventories: Inventory[];
  selectedInventory: Inventory | null;
};

export default function Filters({ inventories, selectedInventory }: Props) {
  const [inventory, setInventory] = useState<string>(
    selectedInventory?._id ?? ""
  );
  const [productName, setProductName] = useState<string>("");

  return (
    <div className="flex flex-col p-6 gap-4">
      <Select
        placeholder="Inventario"
        value={inventory}
        onChange={(el) => setInventory(el.target.value)}
        sx={{
          height: "56px",
          borderRadius: "8px",
          fontSize: "16px",
          lineHeight: "21.6px",
          borderWidth: "2px",
          borderColor: colors.primary,
          "&.Mui-focused": {
            border: "none",
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
              "&.Mui-focused": {
                border: "none",
              },
            },
          },
        }}
      />

      <Button
        className="text-button h-[56px] rounded-lg p-4 uppercase font-bold text-button"
        variant="contained"
        startIcon={<IconFilter size={24} />}
      >
        Filtrar
      </Button>
    </div>
  );
}
