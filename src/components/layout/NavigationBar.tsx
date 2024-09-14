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
import { useCartStore } from "@/stores/cart";
import { Inventory } from "@/types/shared";

type Props = {
  openMenu: () => void;
  openCart: () => void;
  selectedInventory: Inventory | null;
};

export default function NavigationBar({
  openMenu,
  openCart,
  selectedInventory,
}: Props) {
  const setOpenSelectionModal = useInventoryStore(
    (state) => state.setOpenSelectionModal,
  );

  const productsCount = useCartStore((state) =>
    selectedInventory?._id ? state.totalProducts(selectedInventory._id) : 0,
  );

  return (
    <>
      <nav className="h-[120px] bg-white flex flex-col px-6 py-3 gap-2.5 fixed z-[1100] w-full top-0 xl:h-20 xl:flex-row xl:justify-between xl:items-center">
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
            <div className="relative">
              <IconShoppingBag
                color={colors.primary}
                onClick={() => openCart()}
              />
              {productsCount ? (
                <div className="bg-primary rounded-full absolute top-[-12px] right-[-8px] h-5 w-5 text-small flex justify-center items-center text-white font-bold">
                  {productsCount}
                </div>
              ) : null}
            </div>
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
