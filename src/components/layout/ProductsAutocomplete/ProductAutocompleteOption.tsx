import { Product } from "@/types/shared";

type Props = {
  product: Product;
  onClick: (product: Product) => void;
};

export default function ProductsAutocompleteOption({
  product,
  onClick,
}: Props) {
  return <div onClick={() => onClick(product)}>{product.name}</div>;
}
