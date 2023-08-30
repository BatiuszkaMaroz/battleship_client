import { create } from 'zustand';

export enum GameStatus {
  INACTIVE = 'INACTIVE',
  USER_TURN = 'USER_TURN',
  RIVAL_TURN = 'RIVAL_TURN',
  WIN = 'WIN',
  LOSE = 'LOSE',
}

interface GameState {
  gameStatus: GameStatus;
  userBoard?: unknown;
  rivalBoard?: unknown;
  userShips?: unknown;
  rivalShips?: unknown;

  resetState: () => void;
}

export const useGameStore = create<GameState>()((set) => ({
  gameStatus: GameStatus.INACTIVE,
  userBoard: undefined,
  rivalBoard: undefined,
  userShips: undefined,
  rivalShips: undefined,

  resetState: () =>
    set(() => ({
      gameStatus: GameStatus.INACTIVE,
      userBoard: undefined,
      rivalBoard: undefined,
      userShips: undefined,
      rivalShips: undefined,
    })),
}));
