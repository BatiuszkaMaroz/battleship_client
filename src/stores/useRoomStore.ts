import { create } from 'zustand';

export enum RoomState {
  INACTIVE,
  AWAITING,
  PLAYING,
}

interface _RoomState {
  state: RoomState;
  mySetting?: unknown;
  opponentData?: unknown;
  chat?: unknown[];

  resetState: () => void;
}

export const useRoomStore = create<_RoomState>()((set) => ({
  state: RoomState.INACTIVE,
  mySetting: undefined,
  opponentData: undefined,
  chat: undefined,

  resetState: () =>
    set(() => ({
      state: RoomState.INACTIVE,
      mySetting: undefined,
      opponentData: undefined,
      chat: undefined,
    })),
}));
