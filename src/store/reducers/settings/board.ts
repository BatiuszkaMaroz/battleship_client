import { Action, Reducer } from 'redux';

import * as AT from '../../actions/actionTypes';
import { Board, createBoard } from '../../../models/Board';
import randomizeBoard from '../../../shared/utils/randomizeBoard';

export type BoardAction = Action & {
  shipId?: string;
  shipSize?: number;
  i?: number;
  j?: number;
  orientation?: 'vertical' | 'horizontal';
};

const boardReducer: Reducer<Board, BoardAction> = (
  state = createBoard(),
  action,
) => {
  switch (action.type) {
    case AT.RESET_BOARD: {
      return createBoard();
    }

    case AT.RANDOMIZE_BOARD: {
      return randomizeBoard();
    }

    case AT.SET_SHIP: {
      //Clears old position
      const stateCopy = state.map((row) => {
        return row.map((cell) => {
          if (cell.shipId === action.shipId) {
            cell.shipId = null;
          }

          return cell;
        });
      });

      if (action.orientation === 'horizontal') {
        for (let l = 0; l < action.shipSize!; l++) {
          stateCopy[action.i!][action.j! + l].shipId = action.shipId!;
        }
      } else if (action.orientation === 'vertical') {
        for (let l = 0; l < action.shipSize!; l++) {
          stateCopy[action.i! + l][action.j!].shipId = action.shipId!;
        }
      }

      return stateCopy;
    }

    case AT.UNSET_SHIP: {
      //Clears old position
      return state.map((row) => {
        return row.map((col) => {
          if (col.shipId === action.shipId) {
            col.shipId = null;
          }

          return col;
        });
      });
    }

    default: {
      return state;
    }
  }
};

export default boardReducer;
