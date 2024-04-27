import { Inventory } from "@/types/home";

type Props = {
  inventory: Inventory;
};
export default function InventoryPopup({ inventory }: Props) {
  return (
    <div className="pa-2 gap-[10px] rounded flex flex-col max-w-[125px]">
      <div className="bg-primary rounded py-1 px-4 text-center text-body-bold font-bold text-white uppercase">
        {inventory.name}
      </div>
      <p className="text-body">{inventory.address}</p>
    </div>
  );
}
