import { ProductCount, Product } from "@/types/shared";
import { create } from "zustand";

type CartState = {
  products: Map<string, ProductCount[]>;
  totalProducts: (inventoryId: string) => number;
  increaseProduct: (inventoryId: string, product: Product) => void;
  decreaseProduct: (inventoryId: string, product: Product) => void;
  removeProduct: (inventoryId: string, product: Product) => void;
  cleanInventoryProducts: (inventoryId: string) => void;
  getCartInventoryProducts: (inventoryId: string) => ProductCount[];
};

const initialCartProducts = (): Map<string, ProductCount[]> | null => {
  if (typeof window === "undefined") {
    return null;
  }
  const storageCartProducts = localStorage.getItem("cart-products");
  if (!storageCartProducts) {
    return null;
  }

  const storageCartProductsObject = JSON.parse(storageCartProducts);
  return new Map(Object.entries(storageCartProductsObject));
};

const saveProductsMapInLocalStorage = (map: Map<string, ProductCount[]>) => {
  const obj: Record<string, ProductCount[]> = {};
  map.forEach((products, inventoryId) => {
    obj[inventoryId] = products;
  });

  localStorage.setItem("cart-products", JSON.stringify(obj));
};

export const useCartStore = create<CartState>((set, get) => ({
  products: initialCartProducts() ?? new Map<string, ProductCount[]>(),
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

        const productsUpdated = products.set(
          inventoryId,
          cartProductsForSelectedInventory!.slice(),
        );

        saveProductsMapInLocalStorage(productsUpdated);

        return {
          products: productsUpdated,
        };
      }

      cartProductsForSelectedInventory[productAlreadySelectedIdx].count++;

      const productsUpdated = products.set(
        inventoryId,
        cartProductsForSelectedInventory!.slice(),
      );

      saveProductsMapInLocalStorage(productsUpdated);

      return {
        products: productsUpdated,
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

        const productsUpdated = products.set(
          inventoryId,
          cartProductsForSelectedInventory!.slice(),
        );

        saveProductsMapInLocalStorage(productsUpdated);

        return {
          products: productsUpdated,
        };
      }

      if (
        cartProductsForSelectedInventory[productAlreadySelectedIdx].count > 1
      ) {
        cartProductsForSelectedInventory[productAlreadySelectedIdx].count--;

        const productsUpdated = products.set(
          inventoryId,
          cartProductsForSelectedInventory!.slice(),
        );

        saveProductsMapInLocalStorage(productsUpdated);

        return {
          products: productsUpdated,
        };
      }

      cartProductsForSelectedInventory.splice(productAlreadySelectedIdx, 1);

      const productsUpdated = products.set(
        inventoryId,
        cartProductsForSelectedInventory!.slice(),
      );

      saveProductsMapInLocalStorage(productsUpdated);
      return {
        products: productsUpdated,
      };
    }),
  cleanInventoryProducts(inventoryId) {
    set((state) => {
      const { products } = state;
      products.set(inventoryId, []);
      return {
        products,
      };
    });
  },
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

        const productsUpdated = products.set(
          inventoryId,
          cartProductsForSelectedInventory!.slice(),
        );

        saveProductsMapInLocalStorage(productsUpdated);

        return {
          products: productsUpdated,
        };
      }

      cartProductsForSelectedInventory.splice(productAlreadySelectedIdx, 1);

      const productsUpdated = products.set(
        inventoryId,
        cartProductsForSelectedInventory!.slice(),
      );

      saveProductsMapInLocalStorage(productsUpdated);

      return {
        products: productsUpdated,
      };
    });
  },
}));
