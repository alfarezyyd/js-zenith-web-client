import create from 'zustand';

const useUserStore = create((set) => ({
  userProfile: [],
  setUserProfile: (profile) => set({userProfile: profile}),
}));

export default useUserStore;
