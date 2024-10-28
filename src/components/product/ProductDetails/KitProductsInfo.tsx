import { Currency, Inventory, Product } from "@/types/shared";
import Link from "next/link";
import { IconCheck } from "@tabler/icons-react";

type Props = {
  product: Product;
  selectedCurrency: Currency;
  selectedInventory: Inventory;
};

export default function KitProductsInfo({
  product,
  selectedInventory,
  selectedCurrency,
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-body-bold font-bold">Componentes del kit</p>
      <div className="flex flex-col gap-1">
        {product.containedProducts.map(({ name, count, code }) => (
          <Link
            key={code}
            href={`/product/${code}?currency=${selectedCurrency._id}&inventory=${selectedInventory._id}`}
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
