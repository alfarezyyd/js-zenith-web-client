// lib/useCartStore.js
import create from 'zustand';
import {persist} from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      selectedProducts: [],
      setSelectedProducts: (products) => set({selectedProducts: products}),
    }),
    {
      name: 'cart-storage', // Nama storage key (opsional)
      getStorage: () => sessionStorage, // (optional) by default, 'localStorage' is used
    }
  )
);

export default useCartStore;
