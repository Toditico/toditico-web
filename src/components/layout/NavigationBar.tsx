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
import { useEffect, useState } from "react";
import { DrawerListItem } from "./AppDrawer/DrawerList/DrawerListItem";
import NavigationItem from "./AppDrawer/DrawerList/DrawerListItem";
import Link from "next/link";
import { Skeleton } from "@mui/material";
import { scrollToElement } from "@/utils/scroll";
import { useWindowSize } from "@/hooks/useWindowSize";
import { usePathname } from "next/navigation";

type Props = {
  openMenu: () => void;
  openCart: () => void;
  selectedInventory: Inventory | null;
  isLoading: boolean;
  navigationItems: DrawerListItem[];
};

export default function NavigationBar({
  openMenu,
  openCart,
  selectedInventory,
  navigationItems,
  isLoading,
}: Props) {
  const setOpenSelectionModal = useInventoryStore(
    (state) => state.setOpenSelectionModal,
  );

  const { width } = useWindowSize();
  const path = usePathname();

  const [showProductsCount, setShowProductscount] = useState<boolean>(false);

  const productsCount = useCartStore((state) =>
    selectedInventory?._id ? state.totalProducts(selectedInventory._id) : 0,
  );

  useEffect(() => {
    setShowProductscount(!!productsCount);
  }, [productsCount]);

  const InventoryIcon = (
    <IconBuildingWarehouse
      className="cursor-pointer"
      color={colors.primary}
      onClick={() => setOpenSelectionModal(true)}
    />
  );

  const CartIcon = (
    <div className="relative cursor-pointer" onClick={() => openCart()}>
      <IconShoppingBag color={colors.primary} />
      {showProductsCount ? (
        <div className="bg-primary rounded-full absolute top-[-12px] right-[-8px] h-6 w-6 text-small flex justify-center items-center text-white font-bold">
          {productsCount < 99 ? productsCount : "+99"}
        </div>
      ) : null}
    </div>
  );

  return (
    <>
      <nav className="h-[120px] bg-white flex flex-col px-6 py-3 gap-2.5 fixed z-[1100] w-full top-0 xl:h-20 xl:flex-row xl:justify-between xl:items-center">
        <div className="flex flex-row justify-between items-center w-full xl:w-auto">
          <Link
            href="/home"
            onClick={(e) => {
              if (path === "/home") {
                e.preventDefault();
                scrollToElement("header", width, "instant");
                window.location.reload();
              }
            }}
          >
            <Image
              src="/brand-no-logo.svg"
              alt="Toditico"
              width={160}
              height={40}
              priority
            />
          </Link>
          <div className="flex flex-row gap-4 xl:hidden">
            {InventoryIcon}
            {CartIcon}
            {isLoading ? (
              <Skeleton variant="rectangular" height={24} width={24} />
            ) : (
              <IconMenu2 color={colors.primary} onClick={() => openMenu()} />
            )}
          </div>
        </div>
        <div className="flex gap-6">
          {navigationItems.map(({ link, label, isSelected }) => (
            <NavigationItem
              key={link}
              {...{ isSelected, label, link }}
              isDesktop
            ></NavigationItem>
          ))}
        </div>
        <div className="flex flex-row gap-2 xl:w-[600px] xl:items-center">
          <ProductsAutocomplete />
          <CurrenciesSelect />
          <div className="flex-row gap-4 hidden xl:flex">
            {InventoryIcon}
            {CartIcon}
          </div>
        </div>
      </nav>
    </>
  );
}
