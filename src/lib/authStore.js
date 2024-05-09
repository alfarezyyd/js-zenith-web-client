// authStore.js
import {create} from 'zustand';

const useAuthStore = create((set) => ({
  accessToken: localStorage.getItem('accessToken') || null,
  setAccessToken: (token) => {
    set({accessToken: token});
    localStorage.setItem('accessToken', token);
  },
  clearAccessToken: () => {
    set({accessToken: null});
    localStorage.removeItem('accessToken');
  },
}));

export default useAuthStore;
