import { Action, Reducer } from 'redux';

import { GameBoard, createGameBoard } from '../../models/Board';
import * as AT from '../actions/actionTypes';

type GameState = {
  playerBoard: GameBoard | null;
  enemyBoard: GameBoard | null;
};

export type GameAction = Action & {
  board?: GameBoard;
};

const initialState: GameState = {
  playerBoard: null,
  enemyBoard: null,
};

const gameReducer: Reducer<GameState, GameAction> = (
  state = initialState,
  { type, board },
) => {
  switch (type) {
    case AT.SET_GAME_BOARD:
      return { enemyBoard: createGameBoard(), playerBoard: board! };

    case AT.UNSET_GAME_BOARD:
      return { enemyBoard: null, playerBoard: null };

    default: {
      return state;
    }
  }
};

export default gameReducer;
