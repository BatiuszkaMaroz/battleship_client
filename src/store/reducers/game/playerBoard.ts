import { Action, Reducer } from 'redux';

import { GameBoard } from '../../../models/Board';
import { GAME } from '../../actions/actionTypes';

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
    case GAME.SET_PLAYER_BOARD:
      return board!;

    case GAME.RESET_FULL:
      return initialState;

    default: {
      return state;
    }
  }
};

export default playerBoardReducer;
