import { Product } from "@/types/shared";
import Image from "next/image";
import Link from "next/link";
import PlaceHolderImage from "../../../../public/images/placeholder.png";

type Props = {
  product: Product;
  onClick: (product: Product) => void;
};

export default function ProductsAutocompleteOption({
  product,
  onClick,
}: Props) {
  const { name, sellPrice, imageUrl } = product;
  return (
    <Link
      className="flex gap-1 mb-2 cursor-pointer items-center"
      href={`/product/${product.code}`}
      onClick={() => onClick(product)}
    >
      <Image
        src={`${imageUrl}` || PlaceHolderImage}
        alt="Placeholder Image"
        width={84}
        height={84}
      />
      <div className="flex flex-col">
        <p className="text-body font-bold text-dark-gray">{name}</p>
        <p className="text-body font-bold">{`$${sellPrice ?? 350}`}</p>
      </div>
    </Link>
  );
}
