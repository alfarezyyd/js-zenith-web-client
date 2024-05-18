// /lib/cartStore.js
import {create} from 'zustand';

const useCartStore = create((set) => ({
  cart: [],

  // Function to set cart state and save it to localStorage
  setCart: (cart) => {
    set({cart});
    localStorage.setItem('cart', JSON.stringify(cart));
  },

  // Load cart state from localStorage on initialization
  initializeCartFromStorage: () => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      set({cart: JSON.parse(storedCart)});
    }
  },
}));

export default useCartStore;
