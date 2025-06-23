import { Currency, Inventory, Product, Module } from "@/types/shared";
import Link from "next/link";
import { IconCheck } from "@tabler/icons-react";
import ProductCardKit from "@/components/catalogue/ProductsContainer/ProductCard/ProductCardKit";
import { useWindowSize } from "@/hooks/useWindowSize";
import { breakpoints } from "@/constants/breakpoints";

type Props = {
  product: Product;
  selectedCurrency: Currency;
  selectedInventory: Inventory;
  selectedModule: Module;
};

export default function KitProductsInfo({
  product,
  selectedInventory,
  selectedCurrency,
  selectedModule,
}: Props) {
  const { width } = useWindowSize();
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <p className="text-body-bold font-bold">Componentes del kit</p>
        {!!product?.containedProducts?.length &&
          width >= breakpoints.desktop && <ProductCardKit />}
      </div>
      <div className="flex flex-col gap-1">
        {product.containedProducts.map(({ name, count, code }) => (
          <Link
            key={code}
            href={`/product/${code}?currency=${selectedCurrency._id}&inventory=${selectedInventory._id}&module=${selectedModule?._id ?? ""}`}
          >
            <div className="flex gap-1 items-center">
              <IconCheck className="text-primary" />
              <p className="text-body">{`${count} ${name}`}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
