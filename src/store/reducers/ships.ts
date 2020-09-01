import { Action, Reducer } from 'redux';

import * as AT from '../actions/actionTypes';
import { Ships, createShips } from '../../models/Ship';

export interface ShipsAction extends Action {
  shipId?: string;
}

const shipsReducer: Reducer<Ships, ShipsAction> = (
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
