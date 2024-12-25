import { Currency, Inventory, Product } from "@/types/shared";
import Image from "next/image";
import Link from "next/link";
import PlaceHolderImage from "@public/images/placeholder.webp";
import clsx from "clsx";

type Props = {
  product: Product;
  onClick: (product: Product) => void;
  selectedCurrency: Currency;
  selectedInventory: Inventory;
};

export default function ProductsAutocompleteOption({
  product,
  onClick,
  selectedCurrency,
  selectedInventory,
}: Props) {
  const { name, sellPrice, imageUrl, discountPercent } = product;
  return (
    <Link
      className="flex gap-1 mb-2 cursor-pointer items-center"
      href={`/product/${product.code}?currency=${selectedCurrency._id}&inventory=${selectedInventory._id}`}
      onClick={() => onClick(product)}
    >
      <div className="h-[84px] w-[84px] relative">
        <Image
          src={`${imageUrl}` || PlaceHolderImage}
          alt={product.name}
          style={{ objectFit: product.imageUrl ? "contain" : "cover" }}
	  fill
        />
      </div>
      <div className="flex flex-col">
        <p className="text-body font-bold text-dark-gray">{name}</p>
        <div className="flex items-center">
          <p
            className={clsx("text-body font-bold", {
              "line-through": discountPercent > 0,
              "text-gray": discountPercent > 0,
            })}
          >{`${sellPrice ?? -0} ${selectedCurrency.name}`}</p>
          {discountPercent > 0 && (
            <div className="bg-primary py-[2px] px-1 text-body-bold font-bold text-white absolute right-4">
              -{discountPercent}%
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
