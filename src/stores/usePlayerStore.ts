import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface PlayerState {
  id?: string;
  username?: string;

  setId: (id: string) => void;
  setUsername: (username: string) => void;
}

export const usePlayerStore = create<PlayerState>()(
  devtools(
    (set) => ({
      // id: undefined,
      // username: undefined,

      id: '123',
      username: 'user-123',

      setId: (id) => set({ id }),
      setUsername: (username) => set({ username }),
    }),
    { name: 'playerStore' },
  ),
);
