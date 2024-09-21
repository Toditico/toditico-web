"use client";
import { Drawer } from "@mui/material";
import SocialNetworks from "../SocialNetworks";
import DrawerList from "./DrawerList";
import { DrawerListItem } from "./DrawerList/DrawerListItem";
import InventorySelection from "./InventorySelection";
import { Currency, Inventory, Module } from "@/types/shared";

type Props = {
  isOpen: boolean;
  closeDrawer: () => void;
  modules: Module[];
  selectedCurrency: Currency | null;
  selectedInventory: Inventory | null;
  selectedModule: Module | null;
  pathName: string;
};

export default function AppDrawer({
  isOpen,
  modules,
  selectedInventory,
  selectedCurrency,
  selectedModule,
  pathName,
  closeDrawer,
}: Props) {
  const navigationItems: DrawerListItem[] = [
    { label: "Inicio", link: "/home", isSelected: pathName === "/home" },
    {
      label: "Catálogo",
      isSelected: pathName === "/catalogue",
      subItems: modules.map((module) => {
        const subItem: DrawerListItem = {
          label: module.name,
          isSelected: module._id === selectedModule?._id,
          link: `/catalogue?inventory=${selectedInventory?._id}&currency=${selectedCurrency?._id}&module=${module._id}&query=`,
        };
        return subItem;
      }),
      link: ``,
    },
    {
      label: "Nosotros",
      link: "/contact",
      isSelected: pathName === "/contact",
    },
  ];

  return (
    <Drawer open={isOpen} onClose={() => closeDrawer()}>
      <div className="w-[50vw] min-w-[190px] py-4 flex flex-col justify-between h-full">
        <DrawerList items={navigationItems} />
        <div className="flex flex-col gap-[10px]">
          <InventorySelection />
          <div className="px-6 pb-4">
            <SocialNetworks isAlternative={true} />
          </div>
        </div>
      </div>
    </Drawer>
  );
}
