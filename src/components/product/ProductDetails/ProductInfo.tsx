import { Currency, Inventory, Product } from "@/types/shared";
import ProductPrice from "./ProductPrice";
import ProductCardStatus from "@/components/catalogue/ProductsContainer/ProductCard/ProductStatus";
import KitProductsInfo from "./KitProductsInfo";
import { useWindowSize } from "@/hooks/useWindowSize";
import { breakpoints } from "@/constants/breakpoints";

type Props = {
  product: Product;
  selectedCurrency: Currency;
  selectedInventory: Inventory;
};

export default function ProductInfo({
  product,
  selectedCurrency,
  selectedInventory,
}: Props) {
  const { width } = useWindowSize();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <p className="text-h3-desktop font-bold xl:hidden">{product.name}</p>
        {product.description && (
          <p className="text-body">{product.description}</p>
        )}
        {width < breakpoints.desktop && (
          <ProductCardStatus productStatus={product.status} />
        )}
      </div>
      <hr className="text-gray" />
      {product.containedProducts?.length > 0 && (
        <>
          <KitProductsInfo
            product={product}
            selectedCurrency={selectedCurrency}
            selectedInventory={selectedInventory}
          />
          <hr className="text-gray" />
        </>
      )}
      <div className="xl:flex xl:justify-between xl:items-center">
        <ProductPrice
          discount={product.discountPercent}
          originalPrice={product.sellPrice}
          finalPrice={product.finalPrice}
          selectedCurrency={selectedCurrency}
        />
	{width >= breakpoints.desktop && (
          <ProductCardStatus productStatus={product.status} />
        )}
      </div>
    </div>
  );
}
