"use client";
import ProductDetails from "@/components/product/ProductDetails";
import ProductDetailsSkeleton from "@/components/product/ProductDetails/Skeleton";
import clientProductService from "@/services/clientProductsService";
import { useCurrencyStore } from "@/stores/currency";
import { useInventoryStore } from "@/stores/inventory";
import { Product } from "@/types/shared";
import { useEffect, useState } from "react";

export default function ProductPage({ params }: { params: { code: string } }) {
  const { code } = params;
  const [product, setProduct] = useState<Product | null>(null);
  const selectedInventory = useInventoryStore(
    (state) => state.selectedInventory
  );
  const selectedCurrency = useCurrencyStore((state) => state.selectedCurrency);

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        if (!selectedCurrency || !selectedInventory) {
          return;
        }
        const product = await clientProductService.getDetails(
          code,
          selectedCurrency._id,
          selectedInventory._id
        );
        setProduct(product);
      } catch (error) {}
    };
    getProductDetails();
  }, [code, selectedInventory, selectedCurrency]);

  return (
    <div className="p-6">
      {product && selectedCurrency ? (
        <ProductDetails {...{ product, selectedCurrency }}></ProductDetails>
      ) : (
        <ProductDetailsSkeleton />
      )}
    </div>
  );
}
