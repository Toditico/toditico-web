import { Product, ProductCount } from "@/types/shared";
import Image from "next/image";
import PlaceHolderImage from "@public/images/placeholder.png";
import {
  IconCircleX,
  IconCircleMinus,
  IconCirclePlus,
} from "@tabler/icons-react";
import { useCurrencyStore } from "@/stores/currency";

type CartProductListItemProps = {
  productCount: ProductCount;
  increaseProduct: (product: Product) => void;
  decreaseProduct: (product: Product) => void;
  removeProduct: (product: Product) => void;
};

export default function CartProductListItem({
  productCount,
  increaseProduct,
  decreaseProduct,
  removeProduct,
}: CartProductListItemProps) {
  const { product, count } = productCount;
  const { imageUrl, name, finalPrice } = product;
  const selectedCurrency = useCurrencyStore((state) => state.selectedCurrency);

  return (
    <div className="flex gap-4 items-center">
      <div className="relative flex-shrink-0">
        <Image
          src={`${imageUrl}` || PlaceHolderImage}
          alt="Placeholder Image"
          width={84}
          height={84}
        />
        <IconCircleX
          className="absolute right-0 top-0"
          onClick={() => removeProduct(product)}
        />
      </div>
      <div className="flex flex-col gap-4 flex-grow">
        <p className="text-body font-bold">{name}</p>
        <div className="flex justify-between">
          <p className="text-body font-bold">
            {count} x {finalPrice} {selectedCurrency?.name}
          </p>
          <div className="flex gap-2">
            <IconCircleMinus onClick={() => decreaseProduct(product)} />
            <IconCirclePlus onClick={() => increaseProduct(product)} />
          </div>
        </div>
      </div>
    </div>
  );
}
