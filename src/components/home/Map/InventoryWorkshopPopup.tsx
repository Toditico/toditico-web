import { Inventory, Workshop } from "@/types/shared";

type Props = {
  element: Inventory | Workshop;
};
export default function InventoryWorkshopPopup({ element }: Props) {
  return (
    <div className="pa-2 gap-[10px] rounded flex flex-col max-w-[125px]">
      <div className="bg-primary rounded py-1 px-4 text-center text-body-bold font-bold text-white uppercase">
        {element.name}
      </div>
      <p className="text-body">{element.address}</p>
    </div>
  );
}
