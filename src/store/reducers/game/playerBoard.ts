import { Action, Reducer } from 'redux';

import { GameBoard } from '../../../models/Board';
import * as AT from '../../actions/actionTypes';

type PlayerBoardState = GameBoard | null;
export type PlayerBoardAction = Action & {
  board?: GameBoard;
};

const initialState: PlayerBoardState = null;

const playerBoardReducer: Reducer<PlayerBoardState, PlayerBoardAction> = (
  state = initialState,
  { type, board },
) => {
  switch (type) {
    case AT.SET_GAME_BOARDS:
      return board!;

    case AT.RESET_GAME_FULL:
      return initialState;

    default: {
      return state;
    }
  }
};

export default playerBoardReducer;
