import { Action, Reducer } from 'redux';

import * as AT from '../../actions/actionTypes';
import { SettingBoard, createSettingBoard } from '../../../models/Board';
import randomizeBoard from '../../../shared/utils/randomizeBoard';

export type BoardAction = Action & {
  shipId?: string;
  shipSize?: number;
  row?: number;
  col?: number;
  orientation?: 'vertical' | 'horizontal';
};

const boardReducer: Reducer<SettingBoard, BoardAction> = (
  state = createSettingBoard(),
  { type, col, orientation, row, shipId, shipSize },
) => {
  switch (type) {
    case AT.RESET_BOARD: {
      return createSettingBoard();
    }

    case AT.RANDOMIZE_BOARD: {
      return randomizeBoard();
    }

    case AT.SET_SHIP: {
      //Clears old position
      const stateCopy = state.map((row) => {
        return row.map((cell) => {
          if (cell.shipId === shipId) {
            cell.shipId = null;
          }

          return cell;
        });
      });

      if (orientation === 'horizontal') {
        for (let l = 0; l < shipSize!; l++) {
          stateCopy[row!][col! + l].shipId = shipId!;
        }
      } else if (orientation === 'vertical') {
        for (let l = 0; l < shipSize!; l++) {
          stateCopy[row! + l][col!].shipId = shipId!;
        }
      }

      return stateCopy;
    }

    case AT.UNSET_SHIP: {
      //Clears old position
      return state.map((row) => {
        return row.map((col) => {
          if (col.shipId === shipId) {
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
