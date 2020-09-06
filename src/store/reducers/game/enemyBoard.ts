import { Action, Reducer } from 'redux';

import { EnemyBoard, createEnemyBoard } from '../../../models/Board';
import * as AT from '../../actions/actionTypes';

type EnemyBoardState = EnemyBoard;
export type EnemyBoardAction = Action & {};

const initialState: EnemyBoardState = createEnemyBoard();

const gameReducer: Reducer<EnemyBoardState, EnemyBoardAction> = (
  state = initialState,
  { type },
) => {
  switch (type) {
    case AT.RESET_GAME:
    case AT.RESET_GAME_FULL:
      return createEnemyBoard();

    default: {
      return state;
    }
  }
};

export default gameReducer;
