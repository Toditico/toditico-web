import { colors } from "@/constants/colors";
import { useInventoryStore } from "@/stores/inventory";
import { IconBuildingWarehouse } from "@tabler/icons-react";

export default function InventorySelection() {
  const setOpenSelectionModal = useInventoryStore(
    (state) => state.setOpenSelectionModal
  );
  const selectedInventory = useInventoryStore(
    (state) => state.selectedInventory
  );

  return (
    <div
      className="flex py-4 px-6 items-center gap-2"
      onClick={() => setOpenSelectionModal(true)}
    >
      <IconBuildingWarehouse color={colors.primary} size={24} />
      <div className="flex flex-col">
        <p className="font-bold text-primary text-small">Inventario</p>
        <p className="font-bold text-primary text-small">
          {selectedInventory?.name}
        </p>
      </div>
    </div>
  );
}
