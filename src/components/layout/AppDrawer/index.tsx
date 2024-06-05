import { Drawer } from "@mui/material";
import SocialNetworks from "../SocialNetworks";
import DrawerList from "./DrawerList";
import { DrawerListItem } from "./DrawerList/DrawerListItem";
import InventorySelection from "./InventorySelection";

type Props = {
  isOpen: boolean;
  closeDrawer: () => void;
};

export default function AppDrawer({ isOpen, closeDrawer }: Props) {
  const navigationItems: DrawerListItem[] = [
    { label: "Inicio", link: "/" },
    { label: "Catálogo", link: "/catalogue" },
    { label: "Nosotros", link: "/contact" },
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
