import { Action, Reducer } from 'redux';
import { Cell } from './board';

interface GameCell extends Cell {
  hit: boolean;
}

interface GameState {
  playerBoard: GameCell[][] | null;
  enemyBoard: GameCell[][] | null;
}

interface GameAction extends Action {}

const initialState: GameState = {
  playerBoard: null,
  enemyBoard: null,
};

const gameReducer: Reducer<GameState, GameAction> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};

export default gameReducer;
