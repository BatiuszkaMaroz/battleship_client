import { create } from 'zustand';

export enum RoomStatus {
  INACTIVE = 'INACTIVE',
  MATCHMAKING = 'MATCHMAKING',
  READY = 'READY',
  UNREADY = 'UNREADY',
  PLAYING = 'PLAYING',
}

export type RivalData = {
  username: string;
};

export type ChatMessage = {
  username: string;
  content: string;
};

interface RoomState {
  roomStatus: RoomStatus;
  rivalData?: RivalData;
  chat: ChatMessage[];

  setRoomStatus: (roomStatus: RoomStatus) => void;
  setRivalData: (rivalData: RivalData) => void;

  resetState: () => void;
}

export const useRoomStore = create<RoomState>()((set) => ({
  roomStatus: RoomStatus.INACTIVE,
  rivalData: undefined,
  chat: [],

  setRoomStatus: (roomStatus) => set(() => ({ roomStatus })),
  setRivalData: (rivalData) => set(() => ({ rivalData })),

  resetState: () =>
    set(() => ({
      roomStatus: RoomStatus.INACTIVE,
      rivalData: undefined,
      chat: [],
    })),
}));
