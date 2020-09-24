import { Action, Reducer } from 'redux';

import { EnemyBoard, createEnemyBoard } from '../../../models/Board';
import { GAME } from '../../actions/actionTypes';

type EnemyBoardState = EnemyBoard;
export type EnemyBoardAction = Action & {};

const initialState: EnemyBoardState = createEnemyBoard();

const gameReducer: Reducer<EnemyBoardState, EnemyBoardAction> = (
  state = initialState,
  { type },
) => {
  switch (type) {
    case GAME.RESET:
    case GAME.RESET_FULL:
      return createEnemyBoard();

    default: {
      return state;
    }
  }
};

export default gameReducer;
