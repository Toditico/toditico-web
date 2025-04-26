import { localStorageIDs } from "@/constants/localStorage";
import { Inventory } from "@/types/shared";
import { create } from "zustand";

type InventoryState = {
  inventories: Inventory[];
  selectedInventory: Inventory | null;
  previousSelectedInventory: Inventory | null;
  setSelectedInventory: (inventoryId: string) => void;
  setInventories: (
    inventories: Inventory[],
    inventoryToSelect: string | null,
  ) => void;
  openSelectionModal: boolean;
  setOpenSelectionModal: (open: boolean) => void;
};

const initialSelectedInventory = (): Inventory | null => {
  if (typeof window === "undefined") {
    return null;
  }
  const storageInventory = localStorage.getItem(localStorageIDs.inventory);
  return storageInventory ? JSON.parse(storageInventory) : null;
};

export const useInventoryStore = create<InventoryState>((set) => ({
  inventories: [],
  selectedInventory: initialSelectedInventory(),
  previousSelectedInventory: null,
  setSelectedInventory: (inventoryId) =>
    set((state) => {
      const previousSelectedInventory = state.selectedInventory;
      const selectedInventory = state.inventories.find(
        (inventory) => inventory._id === inventoryId,
      );
      localStorage.setItem(
        localStorageIDs.inventory,
        JSON.stringify(selectedInventory),
      );
      return { selectedInventory, previousSelectedInventory };
    }),
  setInventories: (inventories, inventoryToSelect) =>
    set((state) => {
      let { selectedInventory } = state;
      if (selectedInventory?._id === inventoryToSelect) {
        return { inventories };
      }

      if (inventoryToSelect) {
        selectedInventory =
          inventories.find(
            (inventory) => inventory._id === inventoryToSelect,
          ) ?? null;
        localStorage.setItem(
          localStorageIDs.inventory,
          JSON.stringify(selectedInventory),
        );
      }

      return {
        inventories,
        selectedInventory,
      };
    }),
  openSelectionModal: false,
  setOpenSelectionModal: (isOpen) =>
    set(() => {
      return { openSelectionModal: isOpen };
    }),
}));
