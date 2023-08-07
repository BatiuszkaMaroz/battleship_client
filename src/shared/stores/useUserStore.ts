import { create } from 'zustand';

interface UserState {
  userId?: string;
  username?: string;

  setUserId: (id: string) => void;
  setUsername: (username: string) => void;
}

export const useUserStore = create<UserState>()((set) => ({
  setUserId: (id: string) => set((state) => ({ ...state, userId: id })),
  setUsername: (username: string) => set((state) => ({ ...state, username })),
}));
