import { create } from 'zustand';

export enum UserStatus {
  IDLE = 'IDLE',
  POOL = 'POOL',
  ROOM = 'ROOM',
  GAME = 'GAME',
}

interface UserState {
  userStatus: UserStatus;
  userId?: string;
  username?: string;

  setUserStatus: (userStatus: UserStatus) => void;
  setUserId: (id: string) => void;
  setUsername: (username: string) => void;
}

export const useUserStore = create<UserState>()((set) => ({
  userStatus: UserStatus.IDLE,

  setUserStatus: (userStatus) => set((state) => ({ ...state, userStatus })),
  setUserId: (id: string) => set((state) => ({ ...state, userId: id })),
  setUsername: (username: string) => set((state) => ({ ...state, username })),
}));
