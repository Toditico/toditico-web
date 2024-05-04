import { useInventoryStore } from "@/stores/inventory";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { IconX, IconInfoCircle } from "@tabler/icons-react";
import InventoryCard from "./InventoryCard";

export default function InventorySelectionDialog() {
  const inventories = useInventoryStore((state) => state.inventories);
  const selectedInventory = useInventoryStore(
    (state) => state.selectedInventory
  );
  const openSelectionModal = useInventoryStore(
    (state) => state.openSelectionModal
  );
  const setOpenSelectionModal = useInventoryStore(
    (state) => state.setOpenSelectionModal
  );
  const setSelectedInventory = useInventoryStore(
    (state) => state.setSelectedInventory
  );

  return (
    <Dialog open={openSelectionModal} className="rounded">
      <DialogTitle className="flex items-center justify-between">
        <>
          <p>Seleccione el inventario</p>
          <IconX onClick={() => setOpenSelectionModal(false)} />
        </>
      </DialogTitle>
      <DialogContent>
        <div className="flex flex-col gap-6">
          <div className="flex gap-6">
            {inventories.map((inventory) => (
              <InventoryCard
                {...{ inventory }}
                isSelected={inventory._id === selectedInventory?._id}
                key={inventory._id}
                onClick={setSelectedInventory}
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
