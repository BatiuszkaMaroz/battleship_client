import { Action, Reducer } from 'redux';

import { EnemyBoard, createEnemyBoard } from '../../../models/Board';
import { GAME } from '../../actions/actionTypes';

type EnemyBoardState = EnemyBoard;
export type EnemyBoardAction = Action & { board?: EnemyBoard };

const initialState: EnemyBoardState = createEnemyBoard();

const gameReducer: Reducer<EnemyBoardState, EnemyBoardAction> = (
  state = initialState,
  { type, board },
) => {
  switch (type) {
    case GAME.SET_ENEMY_BOARD:
      return board!;

    case GAME.RESET:
    case GAME.RESET_FULL:
      return createEnemyBoard();

    default: {
      return state;
    }
  }
};

export default gameReducer;
