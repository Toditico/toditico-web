import { Currency, Inventory, Product, ProductCount } from "@/types/shared";
import Image from "next/image";
import PlaceHolderImage from "@public/images/placeholder.webp";
import {
  IconCircleX,
  IconCircleMinus,
  IconCirclePlus,
} from "@tabler/icons-react";
import Link from "next/link";

type CartProductListItemProps = {
  productCount: ProductCount;
  increaseProduct: (product: Product) => void;
  decreaseProduct: (product: Product) => void;
  removeProduct: (product: Product) => void;
  selectedCurrency: Currency | null;
  selectedInventory: Inventory | null;
};

export default function CartProductListItem({
  productCount,
  increaseProduct,
  decreaseProduct,
  removeProduct,
  selectedCurrency,
  selectedInventory,
}: CartProductListItemProps) {
  const { product, count } = productCount;
  const { imageUrl, name, finalPrice } = product;

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
        <Link
          href={`/product/${product.code}?currency=${selectedCurrency?._id}&inventory=${selectedInventory?._id}`}
        >
          <p className="text-body font-bold">{name}</p>
          <div className="flex justify-between">
            <p className="text-body font-bold">
              {count} x {finalPrice} {selectedCurrency?.name}
            </p>
            <div className="flex gap-2">
              <IconCircleMinus
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  decreaseProduct(product);
                }}
              />
              <IconCirclePlus
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  increaseProduct(product);
                }}
              />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
