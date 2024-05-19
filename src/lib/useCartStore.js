// lib/useCartStore.js
import create from 'zustand';

const useCartStore = create((set) => ({
  selectedProducts: [],
  setSelectedProducts: (products) => set({ selectedProducts: products }),
}));

export default useCartStore;