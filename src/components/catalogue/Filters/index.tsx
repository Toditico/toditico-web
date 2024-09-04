"use client";

import { colors } from "@/constants/colors";
import { Inventory } from "@/types/shared";
import { Button, MenuItem, Select, Skeleton, TextField } from "@mui/material";
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
  isLoading = false,
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
    <div className="flex flex-col p-6 gap-4">
      {isLoading ? (
        <>
          <Skeleton variant="rectangular" height={56} width={"100%"} />
          <Skeleton variant="rectangular" height={56} width={"100%"} />
          <Skeleton variant="rectangular" height={56} width={"100%"} />
        </>
      ) : (
        <>
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
            className="h-[56px] rounded-lg p-4 uppercase font-bold text-button"
            variant="contained"
            startIcon={<IconFilter size={24} />}
            onClick={() => onFilter(productName, inventory)}
          >
            Filtrar
          </Button>
        </>
      )}
    </div>
  );
}
