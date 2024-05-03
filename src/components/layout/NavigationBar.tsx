import Image from "next/image";
import { IconMenu2 } from "@tabler/icons-react";
import { IconShoppingBag } from "@tabler/icons-react";
import { colors } from "@/constants/colors";
import ProductsAutocomplete from "./ProductsAutocomplete";
import CurrenciesSelect from "./CurrenciesSelect";

export default function NavigationBar() {
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
          <div className="flex flex-row gap-4">
            <IconShoppingBag color={colors.primary} />
            <IconMenu2 color={colors.primary} />
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <ProductsAutocomplete />
	  <CurrenciesSelect />
        </div>
      </nav>
    </>
  );
}
