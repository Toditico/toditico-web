import { ProductCount, Product } from "@/types/shared";
import { create } from "zustand";

type CartState = {
  products: ProductCount[];
  increaseProduct: (product: Product) => void;
  decreaseProduct: (product: Product) => void;
  removeProduct: (product: Product) => void;
};

export const useCartStore = create<CartState>((set) => ({
  products: [],
  increaseProduct: (selectedProduct) =>
    set((state) => {
      const { products } = state;
      const productAlreadySelectedIdx = products.findIndex(
        ({ product }) => product._id === selectedProduct._id,
      );
      if (productAlreadySelectedIdx === -1) {
        products.push({ product: selectedProduct, count: 1 });
        return {
          products: products.slice(),
        };
      }
      products[productAlreadySelectedIdx].count++;
      return { products: products.slice() };
    }),
  decreaseProduct: (selectedProduct) =>
    set((state) => {
      const { products } = state;
      const productAlreadySelectedIdx = products.findIndex(
        ({ product }) => product._id === selectedProduct._id,
      );

      if (productAlreadySelectedIdx === -1) {
        console.error("Trying to decrease a not selected product");
        return { products: products.slice() };
      }

      if (products[productAlreadySelectedIdx].count > 1) {
        products[productAlreadySelectedIdx].count--;
        return { products: products.slice() };
      }

      products.splice(productAlreadySelectedIdx, 1);
      return { products: products.slice() };
    }),
  removeProduct: (selectedProduct) => {
    set((state) => {
      const { products } = state;
      const productAlreadySelectedIdx = products.findIndex(
        ({ product }) => product._id === selectedProduct._id,
      );

      if (productAlreadySelectedIdx === -1) {
        console.error("Trying to decrease a not selected product");
        return { products: products.slice() };
      }

      products.splice(productAlreadySelectedIdx, 1);
      return { products: products.slice() };
    });
  },
}));
