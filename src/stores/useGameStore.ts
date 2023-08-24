import { create } from 'zustand';

enum GameState {
  INACTIVE,
  MY_TURN,
  OPPONENT_TURN,
  WIN,
  LOSE,
}

interface _GameState {
  state: GameState;
  myBoard?: unknown;
  opponentBoard?: unknown;
  myShips?: unknown;
  opponentShips?: unknown;

  resetState: () => void;
}

export const useGameStore = create<_GameState>()((set) => ({
  state: GameState.INACTIVE,
  myBoard: undefined,
  opponentBoard: undefined,
  myShips: undefined,
  opponentShips: undefined,

  resetState: () =>
    set(() => ({
      state: GameState.INACTIVE,
      myBoard: undefined,
      opponentBoard: undefined,
      myShips: undefined,
      opponentShips: undefined,
    })),
}));
