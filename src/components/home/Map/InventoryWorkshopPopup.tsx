import { Inventory, Workshop } from "@/types/shared";
import clsx from "clsx";

type Props = {
  element: Inventory | Workshop;
  type: "Inventory" | "Workshop";
};
export default function InventoryWorkshopPopup({ element, type }: Props) {
  return (
    <div className="pa-2 gap-[10px] rounded flex flex-col max-w-[125px]">
      <div
        className={clsx(
          "rounded py-1 px-4 text-center text-body-bold font-bold text-white uppercase",
          {
            "bg-primary": type === "Inventory",
            "bg-secondary": type === "Workshop",
          },
        )}
      >
        {element.name}
      </div>
      <p className="text-body">{element.address}</p>
    </div>
  );
}
