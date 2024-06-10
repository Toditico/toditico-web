import { Inventory } from "@/types/shared";
import { create } from "zustand";

type InventoryState = {
  inventories: Inventory[];
  selectedInventory: Inventory | null;
  setSelectedInventory: (inventory: Inventory) => void;
  setInventories: (inventories: Inventory[]) => void;
  openSelectionModal: boolean;
  setOpenSelectionModal: (open: boolean) => void;
};

const initialSelectedInventory = (): Inventory | null => {
  if (typeof window === "undefined") {
    return null;
  }
  const storageInventory = localStorage.getItem("inventory");
  return storageInventory ? JSON.parse(storageInventory) : null;
};

export const useInventoryStore = create<InventoryState>((set) => ({
  inventories: [],
  selectedInventory: initialSelectedInventory(),
  setSelectedInventory: (inventory) =>
    set(() => {
      localStorage.setItem("inventory", JSON.stringify(inventory));
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
