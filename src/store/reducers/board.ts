import { Action, Reducer } from 'redux';
import * as AT from '../actions/actionTypes';
import randomizeBoard from '../../shared/utils/randomizeBoard';

export class Cell {
  id: string;
  shipId: string | null;

  constructor(public row: number, public col: number) {
    this.id = `${row * cols.length + col}`;

    this.shipId = null;
  }
}

//***
// EDITABLE
//***
const rows = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const cols = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export const createBoard = () => {
  const board = rows.map((row) => {
    return cols.map((col) => {
      return new Cell(row, col);
    });
  });

  return board;
};

//--------------------------------------------------//
//--------------------------------------------------//
//--------------------------------------------------//

type BoardState = Cell[][];

export interface BoardAction extends Action {
  shipId?: string;
  shipSize?: number;
  i?: number;
  j?: number;
  orientation?: 'vertical' | 'horizontal';
}

const boardReducer: Reducer<BoardState, BoardAction> = (
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
