import { Currency, Inventory, Product } from "@/types/shared";
import ProductPrice from "./ProductPrice";
import ProductCardStatus from "@/components/catalogue/ProductsContainer/ProductCard/ProductStatus";
import KitProductsInfo from "./KitProductsInfo";

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
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <p className="text-h3-desktop font-bold">{product.name}</p>
        {product.description && (
          <p className="text-body">{product.description}</p>
        )}
        <ProductCardStatus productStatus={product.status} />
      </div>
      <hr className="text-gray"/>
      {product.containedProducts?.length > 0 && (
        <>
          <KitProductsInfo
            product={product}
            selectedCurrency={selectedCurrency}
            selectedInventory={selectedInventory}
          />
          <hr className="text-gray"/>
        </>
      )}
      <ProductPrice
        discount={product.discountPercent}
        originalPrice={product.sellPrice}
        finalPrice={product.finalPrice}
        selectedCurrency={selectedCurrency}
      />
    </div>
  );
}
