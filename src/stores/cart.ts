import { ProductCount, Product } from "@/types/shared";
import { create } from "zustand";

type CartState = {
  products: ProductCount[];
  totalProducts: number;
  increaseProduct: (product: Product) => void;
  decreaseProduct: (product: Product) => void;
  removeProduct: (product: Product) => void;
};

export const useCartStore = create<CartState>((set) => ({
  products: [],
  totalProducts: 0,
  increaseProduct: (selectedProduct) =>
    set((state) => {
      const { products, totalProducts } = state;
      const productAlreadySelectedIdx = products.findIndex(
        ({ product }) => product._id === selectedProduct._id,
      );
      if (productAlreadySelectedIdx === -1) {
        products.push({ product: selectedProduct, count: 1 });
        return {
          products: products.slice(),
          totalProducts: totalProducts + 1,
        };
      }
      products[productAlreadySelectedIdx].count++;
      return { products: products.slice(), totalProducts: totalProducts + 1 };
    }),
  decreaseProduct: (selectedProduct) =>
    set((state) => {
      const { products, totalProducts } = state;
      const productAlreadySelectedIdx = products.findIndex(
        ({ product }) => product._id === selectedProduct._id,
      );

      if (productAlreadySelectedIdx === -1) {
        console.error("Trying to decrease a not selected product");
        return { products: products.slice() };
      }

      if (products[productAlreadySelectedIdx].count > 1) {
        products[productAlreadySelectedIdx].count--;
        return { products: products.slice(), totalProducts: totalProducts - 1 };
      }

      products.splice(productAlreadySelectedIdx, 1);
      return { products: products.slice(), totalProducts: totalProducts - 1 };
    }),
  removeProduct: (selectedProduct) => {
    set((state) => {
      const { products, totalProducts } = state;
      const productAlreadySelectedIdx = products.findIndex(
        ({ product }) => product._id === selectedProduct._id,
      );

      if (productAlreadySelectedIdx === -1) {
        console.error("Trying to decrease a not selected product");
        return { products: products.slice(), totalProducts };
      }

      const count = products[productAlreadySelectedIdx].count;

      products.splice(productAlreadySelectedIdx, 1);
      return {
        products: products.slice(),
        totalProducts: totalProducts - count,
      };
    });
  },
}));
