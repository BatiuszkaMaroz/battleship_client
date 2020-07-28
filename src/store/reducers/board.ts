import { Action, Reducer } from 'redux';

class Cell {
  id: string;
  shipId: string | null;

  constructor(public row: number, public col: number) {
    this.id = `${row}${col}`;
    this.shipId = null;
  }
}

const rows = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const cols = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const board = rows.map((row) => {
  return cols.map((col) => {
    return new Cell(row, col);
  });
});

//--------------------------------------------------//

type boardState = Cell[][];

interface boardAction extends Action {}

const initialState = board;

const boardReducer: Reducer<boardState, boardAction> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default boardReducer;
