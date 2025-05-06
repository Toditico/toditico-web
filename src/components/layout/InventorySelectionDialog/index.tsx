import { useInventoryStore } from "@/stores/inventory";
import { Inventory } from "@/types/shared";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { IconX, IconInfoCircle } from "@tabler/icons-react";
import InventoriesSelection from "./InventoriesSelection";
import { useWindowSize } from "@/hooks/useWindowSize";
import { breakpoints } from "@/constants/breakpoints";

type Props = {
  selectedInventory: Inventory | null;
};

export default function InventorySelectionDialog({ selectedInventory }: Props) {
  const inventories = useInventoryStore((state) => state.inventories);
  const openSelectionModal = useInventoryStore(
    (state) => state.openSelectionModal,
  );
  const setOpenSelectionModal = useInventoryStore(
    (state) => state.setOpenSelectionModal,
  );
  const setSelectedInventory = useInventoryStore(
    (state) => state.setSelectedInventory,
  );
  const inventorySelected = (inventory: Inventory) => {
    setSelectedInventory(inventory._id);
    setOpenSelectionModal(false);
  };
  const { width } = useWindowSize();

  return (
    <Dialog
      open={openSelectionModal}
      className="rounded"
      sx={
        width >= breakpoints.desktop
          ? {
              "div.MuiPaper-root.MuiPaper-elevation.MuiDialog-paper": {
                width: "min-content",
                minWidth: "300px",
                maxWidth: "564px",
              },
            }
          : {}
      }
    >
      <DialogTitle className="flex items-center justify-between">
        <>
          <p>Seleccione el inventario</p>
          {selectedInventory && (
            <IconX
              className="cursor-pointer"
              onClick={() => setOpenSelectionModal(false)}
            />
          )}
        </>
      </DialogTitle>
      <DialogContent className="w-full overflow-hidden">
        <div className="flex flex-col gap-6">
          <div className="flex gap-6 justify-around">
            <InventoriesSelection
              inventories={inventories}
              selectedInventory={selectedInventory}
              onInventorySelected={inventorySelected}
            />
          </div>
          <div className="flex gap-2">
            <IconInfoCircle className="w-6" />
            <span className="text-small w-[calc(100%-24px)]">
              Toda la disponibilidad de nuestros productos le aparecerán de
              acuerdo con el inventario seleccionado.
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
