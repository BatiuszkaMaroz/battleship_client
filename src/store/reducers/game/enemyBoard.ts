import { Action, Reducer } from 'redux';

import { GameBoard, createEnemyBoard } from '../../../models/Board';
import * as AT from '../../actions/actionTypes';

type EnemyBoardState = GameBoard | null;
export type EnemyBoardAction = Action & {};

const initialState: EnemyBoardState = null;

const gameReducer: Reducer<EnemyBoardState, EnemyBoardAction> = (
  state = initialState,
  { type },
) => {
  switch (type) {
    case AT.SET_GAME_BOARDS:
      return createEnemyBoard();

    case AT.UNSET_GAME_BOARDS:
      return null;

    default: {
      return state;
    }
  }
};

export default gameReducer;
