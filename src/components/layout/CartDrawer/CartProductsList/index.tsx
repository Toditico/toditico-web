import { useCartStore } from "@/stores/cart";
import CartProductListItem from "./CartProductListItem";
import { Product, ProductCount } from "@/types/shared";
import { useInventoryStore } from "@/stores/inventory";

type Props = {
  products: ProductCount[];
};

export default function CartProductList({ products }: Props) {
  const increaseProduct = useCartStore((state) => state.increaseProduct);
  const decreaseProduct = useCartStore((state) => state.decreaseProduct);
  const removeProduct = useCartStore((state) => state.removeProduct);
  const selectedInventory = useInventoryStore(
    (state) => state.selectedInventory,
  );

  const onProductIncreased = (product: Product) => {
    if (selectedInventory) {
      increaseProduct(selectedInventory._id, product);
    }
  };

  const onProductDecreased = (product: Product) => {
    if (selectedInventory) {
      decreaseProduct(selectedInventory._id, product);
    }
  };

  const onProductRemoved = (product: Product) => {
    if (selectedInventory) {
      removeProduct(selectedInventory._id, product);
    }
  };

  return (
    <div className="flex flex-col gap-4 overflow-y-auto max-h-[75vh]">
      {products.map((productCount) => (
        <CartProductListItem
          productCount={productCount}
          key={productCount.product._id}
          increaseProduct={onProductIncreased}
          decreaseProduct={onProductDecreased}
          removeProduct={onProductRemoved}
        />
      ))}
    </div>
  );
}
