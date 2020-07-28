import { Action, Reducer } from 'redux';
import * as AT from '../actions/actionTypes';

class Ship {
  id: string;
  orientation: 'horizontal' | 'vertical' = 'horizontal';
  currentCell: null | HTMLDivElement = null;
  settled: boolean = false;

  constructor(id: number, public size: number) {
    this.id = `ship-${id}`;
  }
}

const ships = [
  new Ship(0, 4),
  new Ship(1, 3),
  new Ship(2, 3),
  new Ship(3, 2),
  new Ship(4, 2),
  new Ship(5, 2),
  new Ship(6, 1),
  new Ship(7, 1),
  new Ship(8, 1),
  new Ship(9, 1),
];

//--------------------------------------------------//

type ShipsState = Ship[];

interface ShipsAction extends Action {
  shipId?: string;
  newCell?: HTMLDivElement;
}

const initialState = ships;

const shipsReducer: Reducer<ShipsState, ShipsAction> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case AT.SET_CURRENT_CELL:
      return state.map((ship) => {
        if (ship.id === action.shipId) {
          ship.currentCell = action.newCell!;
        }

        return ship;
      });
    default:
      return state;
  }
};

export default shipsReducer;
