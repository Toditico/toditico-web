import { Inventory } from "@/types/shared";
import { create } from "zustand";

type InventoryState = {
  inventories: Inventory[];
  selectedInventory?: Inventory;
  setSelectedInventory: (inventory: Inventory) => void;
  setInventories: (inventories: Inventory[]) => void;
  openSelectionModal: boolean;
  setOpenSelectionModal: (open: boolean) => void;
};

export const useInventoryStore = create<InventoryState>((set) => ({
  inventories: [],
  setSelectedInventory: (inventory) =>
    set(() => {
      return { selectedInventory: inventory };
    }),
  setInventories: (inventories) =>
    set(() => {
      return {
        inventories,
      };
    }),
  openSelectionModal: false,
  setOpenSelectionModal: (isOpen) =>
    set(() => {
      return { openSelectionModal: isOpen };
    }),
}));
