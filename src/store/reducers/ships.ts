import { Action, Reducer } from 'redux';
import * as AT from '../actions/actionTypes';
class Ship {
  id: string;
  settled: boolean = false;

  constructor(id: number, public size: number) {
    this.id = `ship-${id}`;
  }
}

//***
//EDITABLE
//***
export const createShips = () => {
  return [
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
};

//--------------------------------------------------//
//--------------------------------------------------//
//--------------------------------------------------//

type ShipsState = Ship[];

export interface ShipsAction extends Action {
  shipId?: string;
}

const shipsReducer: Reducer<ShipsState, ShipsAction> = (
  state = createShips(),
  action,
) => {
  switch (action.type) {
    case AT.RESET_BOARD: {
      return createShips();
    }

    case AT.RANDOMIZE_BOARD: {
      return state.map((ship) => {
        ship.settled = true;
        return ship;
      });
    }

    case AT.SET_SHIP: {
      return state.map((ship) => {
        if (ship.id === action.shipId) {
          ship.settled = true;
        }

        return ship;
      });
    }

    case AT.UNSET_SHIP: {
      return state.map((ship) => {
        if (ship.id === action.shipId) {
          ship.settled = false;
        }

        return ship;
      });
    }

    default: {
      return state;
    }
  }
};

export default shipsReducer;
