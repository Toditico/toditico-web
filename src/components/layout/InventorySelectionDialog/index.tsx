import { useInventoryStore } from "@/stores/inventory";
import { Inventory } from "@/types/shared";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { IconX, IconInfoCircle } from "@tabler/icons-react";
import InventoryCard from "./InventoryCard";

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

  return (
    <Dialog open={openSelectionModal} className="rounded">
      <DialogTitle className="flex items-center justify-between">
        <>
          <p>Seleccione el inventario</p>
          {selectedInventory && (
            <IconX onClick={() => setOpenSelectionModal(false)} />
          )}
        </>
      </DialogTitle>
      <DialogContent>
        <div className="flex flex-col gap-6">
          <div className="flex gap-6 flex-wrap">
            {inventories.map((inventory) => (
              <InventoryCard
                {...{ inventory }}
                isSelected={inventory._id === selectedInventory?._id}
                key={inventory._id}
                onClick={inventorySelected}
              />
            ))}
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
