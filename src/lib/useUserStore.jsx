import {create} from 'zustand';
import {persist} from "zustand/middleware";

const useUserStore = create(
  persist(
    (set, get) => ({
      userProfile: [],
      setUserProfile: (profile) => set({userProfile: profile}),
    }),
    {
      name: 'profile-storage', // Nama storage key (opsional)
    }
  )
);

export default useUserStore;
