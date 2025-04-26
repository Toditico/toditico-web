import { colors } from "@/constants/colors";
import { Inventory } from "@/types/shared";
import { IconBuildingWarehouse } from "@tabler/icons-react";
import clsx from "clsx";

type Props = {
  inventory: Inventory;
  isSelected: boolean;
  onClick: (inventory: Inventory) => void;
};

export default function InventoryCard({
  inventory,
  isSelected,
  onClick,
}: Props) {
  return (
    <div
      onClick={() => onClick(inventory)}
      className={clsx(
        "w-[120px] min-h-[136px] p-6 flex flex-col gap-[10px] rounded items-center text-center cursor-pointer",
        {
          "bg-gray": !isSelected,
          "bg-primary": isSelected,
        },
      )}
    >
      <IconBuildingWarehouse
        size={24}
        color={isSelected ? colors.white : colors["dark-gray"]}
      />
      <div>
        <p
          className={clsx("text-body font-bold", {
            "text-dark-gray": !isSelected,
            "text-white": isSelected,
          })}
        >
          Inventario
        </p>
        <p
          className={clsx("text-small font-bold", {
            "text-dark-gray": !isSelected,
            "text-white": isSelected,
          })}
        >
          {inventory.name}
        </p>
      </div>
    </div>
  );
}
