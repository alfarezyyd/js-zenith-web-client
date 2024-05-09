// authStore.js
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set, get) => ({
      accessToken: get()?.accessToken,
      setAccessToken: (token) => set({accessToken: token}),
      clearAccessToken: () => set({accessToken: null}),
    }),
    {
      name: 'auth-storage', // Nama storage key (opsional)
      getStorage: () => sessionStorage, // (optional) by default, 'localStorage' is used
    }
  )
);

export default useAuthStore;
