import { useCartStore } from "@/stores/cart";
import CartProductListItem from "./CartProductListItem";
import { ProductCount } from "@/types/shared";

type Props = {
  products: ProductCount[];
};

export default function CartProductList({ products }: Props) {
  const increaseProduct = useCartStore((state) => state.increaseProduct);
  const decreaseProduct = useCartStore((state) => state.decreaseProduct);
  const removeProduct = useCartStore((state) => state.removeProduct);

  return (
    <div className="flex flex-col gap-4 overflow-y-auto max-h-[75vh]">
      {products.map((productCount) => (
        <CartProductListItem
          productCount={productCount}
          key={productCount.product._id}
          {...{ increaseProduct, decreaseProduct, removeProduct }}
        />
      ))}
    </div>
  );
}
