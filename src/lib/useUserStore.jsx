import create from 'zustand';

const useUserStore = create((set) => ({
  userProfile: null,
  setUserProfile: (profile) => set({userProfile: profile}),
}));

export default useUserStore;
