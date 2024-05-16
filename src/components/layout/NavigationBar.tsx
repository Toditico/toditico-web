import Image from "next/image";
import {
  IconMenu2,
  IconShoppingBag,
  IconBuildingWarehouse,
} from "@tabler/icons-react";
import { colors } from "@/constants/colors";
import CurrenciesSelect from "./CurrenciesSelect";
import { useInventoryStore } from "@/stores/inventory";
import ProductsAutocomplete from "./ProductsAutocomplete";

type Props = {
  openMenu: () => void;
};

export default function NavigationBar({ openMenu }: Props) {
  const setOpenSelectionModal = useInventoryStore(
    (state) => state.setOpenSelectionModal
  );
  return (
    <>
      <nav className="h-[120px] flex flex-col px-6 py-3 gap-2.5 xl:h-20 xl:flex-row xl:justify-between xl:items-center">
        <div className="flex flex-row justify-between items-center w-full">
          <Image
            src="/brand-no-logo.svg"
            alt="Toditico"
            width={160}
            height={40}
            priority
          />
          <div className="flex flex-row gap-4 xl:hidden">
            <IconBuildingWarehouse
              color={colors.primary}
              onClick={() => setOpenSelectionModal(true)}
            />
            <IconShoppingBag color={colors.primary} />
            <IconMenu2 color={colors.primary} onClick={() => openMenu()} />
          </div>
        </div>
        <div className="flex flex-row gap-2 xl:w-[600px] xl:items-center">
          <ProductsAutocomplete />
          <CurrenciesSelect />
          <div className="flex-row gap-4 hidden xl:flex">
            <IconBuildingWarehouse
              color={colors.primary}
              onClick={() => setOpenSelectionModal(true)}
            />
            <IconShoppingBag color={colors.primary} />
            <IconMenu2 color={colors.primary} />
          </div>
        </div>
      </nav>
    </>
  );
}
