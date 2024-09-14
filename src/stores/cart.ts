import { ProductCount, Product } from "@/types/shared";
import { create } from "zustand";

type CartState = {
  products: Map<string, ProductCount[]>;
  totalProducts: (inventoryId: string) => number;
  increaseProduct: (inventoryId: string, product: Product) => void;
  decreaseProduct: (inventoryId: string, product: Product) => void;
  removeProduct: (inventoryId: string, product: Product) => void;
  getCartInventoryProducts: (inventoryId: string) => ProductCount[];
};

export const useCartStore = create<CartState>((set, get) => ({
  products: new Map<string, ProductCount[]>(),
  getCartInventoryProducts: (inventoryId: string) => {
    const productsMap = get().products;
    return productsMap.get(inventoryId) ?? [];
  },
  totalProducts: (inventoryId: string) => {
    const products = get().products;
    const totalProducts = products.get(inventoryId)?.length;
    return totalProducts ?? 0;
  },
  increaseProduct: (inventoryId, selectedProduct) =>
    set((state) => {
      const { products } = state;
      const cartProductsForSelectedInventory = products.get(inventoryId) ?? [];
      const productAlreadySelectedIdx =
        cartProductsForSelectedInventory?.findIndex(
          ({ product }) => product._id === selectedProduct._id,
        );
      if (productAlreadySelectedIdx === -1) {
        cartProductsForSelectedInventory?.push({
          product: selectedProduct,
          count: 1,
        });
        return {
          products: products.set(
            inventoryId,
            cartProductsForSelectedInventory!.slice(),
          ),
        };
      }
      cartProductsForSelectedInventory[productAlreadySelectedIdx].count++;
      return {
        products: products.set(
          inventoryId,
          cartProductsForSelectedInventory.slice(),
        ),
      };
    }),
  decreaseProduct: (inventoryId, selectedProduct) =>
    set((state) => {
      const { products } = state;
      const cartProductsForSelectedInventory = products.get(inventoryId) ?? [];
      const productAlreadySelectedIdx =
        cartProductsForSelectedInventory.findIndex(
          ({ product }) => product._id === selectedProduct._id,
        );

      if (productAlreadySelectedIdx === -1) {
        console.error("Trying to decrease a not selected product");
        return {
          products: products.set(
            inventoryId,
            cartProductsForSelectedInventory.slice(),
          ),
        };
      }

      if (
        cartProductsForSelectedInventory[productAlreadySelectedIdx].count > 1
      ) {
        cartProductsForSelectedInventory[productAlreadySelectedIdx].count--;
        return {
          products: products.set(
            inventoryId,
            cartProductsForSelectedInventory.slice(),
          ),
        };
      }

      cartProductsForSelectedInventory.splice(productAlreadySelectedIdx, 1);
      return {
        products: products.set(
          inventoryId,
          cartProductsForSelectedInventory.slice(),
        ),
      };
    }),
  removeProduct: (inventoryId, selectedProduct) => {
    set((state) => {
      const { products } = state;
      const cartProductsForSelectedInventory = products.get(inventoryId) ?? [];
      const productAlreadySelectedIdx =
        cartProductsForSelectedInventory.findIndex(
          ({ product }) => product._id === selectedProduct._id,
        );

      if (productAlreadySelectedIdx === -1) {
        console.error("Trying to decrease a not selected product");
        return {
          products: products.set(
            inventoryId,
            cartProductsForSelectedInventory.slice(),
          ),
        };
      }

      cartProductsForSelectedInventory.splice(productAlreadySelectedIdx, 1);
      return {
        products: products.set(
          inventoryId,
          cartProductsForSelectedInventory.slice(),
        ),
      };
    });
  },
}));
