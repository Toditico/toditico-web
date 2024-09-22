import { useCartStore } from "@/stores/cart";
import CartProductListItem from "./CartProductListItem";
import { Product, ProductCount } from "@/types/shared";
import { useInventoryStore } from "@/stores/inventory";
import { Skeleton } from "@mui/material";

type Props = {
  products: ProductCount[];
  isLoading: boolean;
};

export default function CartProductList({ products, isLoading }: Props) {
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

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 overflow-y-auto max-h-[75vh]">
        <div className="relative flex-shrink-0 flex">
          <Skeleton variant="rectangular" width={84} height={84} />
          <Skeleton width={window.innerWidth - 130} height={84} />
        </div>
        <div className="relative flex-shrink-0 flex">
          <Skeleton variant="rectangular" width={84} height={84} />
          <Skeleton width={window.innerWidth - 130} height={84} />
        </div>
        <div className="relative flex-shrink-0 flex">
          <Skeleton variant="rectangular" width={84} height={84} />
          <Skeleton width={window.innerWidth - 130} height={84} />
        </div>
      </div>
    );
  }

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
