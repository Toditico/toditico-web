import { useCartStore } from "@/stores/cart";
import CartProductListItem from "./CartProductListItem";
import { Product, ProductCount } from "@/types/shared";
import { useInventoryStore } from "@/stores/inventory";
import { Skeleton } from "@mui/material";
import { useCurrencyStore } from "@/stores/currency";
import { nextImageUrl } from "@/utils/images";
import Placeholder from "@public/images/placeholder.webp";
import { useImagesModalStore } from "@/stores/imagesModal";
import { twoFixedPlacesIfFloat } from "@/utils/numbers";

type Props = {
  products: ProductCount[];
  isLoading: boolean;
  closeDrawer: () => void;
};

export default function CartProductList({ products, isLoading, closeDrawer }: Props) {
  const selectedInventory = useInventoryStore(
    (state) => state.selectedInventory,
  );
  const increaseProduct = useCartStore((state) => state.increaseProduct);
  const decreaseProduct = useCartStore((state) => state.decreaseProduct);
  const removeProduct = useCartStore((state) => state.removeProduct);
  const subTotal = useCartStore((state) =>
    selectedInventory ? state.subTotal(selectedInventory._id) : 0,
  );
  const selectedCurrency = useCurrencyStore((state) => state.selectedCurrency);
  const setSlides = useImagesModalStore((state) => state.setSlides);
  const setIndex = useImagesModalStore((state) => state.setIndex);
  const openModal = useImagesModalStore((state) => state.openModal);

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

  const onOpenImagesModal = (index: number) => {
    setSlides(
      products.map(({ product }) => {
        return product.imageUrl
          ? {
              src: nextImageUrl(product.imageUrl),
            }
          : Placeholder;
      }),
    );
    setIndex(index);
    openModal();
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
    <div
      className="flex flex-col gap-3"
      style={{ maxHeight: "calc(100dvh - 130px)" }}
    >
      <div
        className="flex flex-col gap-4 overflow-y-auto"
        style={{ maxHeight: "calc(100dvh - 150px)" }}
      >
        {products.map((productCount, idx) => (
          <>
            <CartProductListItem
              selectedInventory={selectedInventory}
              selectedCurrency={selectedCurrency}
              productCount={productCount}
              key={productCount.product._id}
              increaseProduct={onProductIncreased}
              decreaseProduct={onProductDecreased}
              removeProduct={onProductRemoved}
              openImagesModal={() => onOpenImagesModal(idx)}
	      closeDrawer={closeDrawer}
            />
	    <hr className="text-gray" />
          </>
        ))}
      </div>
      <div className="flex justify-between text-primary uppercase text-body font-bold">
        <p>Total</p>
        <p>
          {twoFixedPlacesIfFloat(subTotal)} {selectedCurrency?.name}
        </p>
      </div>
    </div>
  );
}
