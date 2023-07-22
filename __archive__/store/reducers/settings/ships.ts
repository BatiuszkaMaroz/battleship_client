import { Action, Reducer } from 'redux';

import { SETTING } from '../../actions/actionTypes';
import { Ships, createShips } from '../../../models/Ship';

export type ShipsAction = Action & {
  shipId?: string;
};

const shipsReducer: Reducer<Ships, ShipsAction> = (
  state = createShips(),
  { type, shipId },
) => {
  switch (type) {
    case SETTING.RESET_BOARD: {
      return createShips();
    }

    case SETTING.RANDOMIZE_BOARD: {
      return state.map((ship) => {
        ship.settled = true;
        return ship;
      });
    }

    case SETTING.SET_SHIP: {
      return state.map((ship) => {
        if (ship.id === shipId) {
          ship.settled = true;
        }

        return ship;
      });
    }

    case SETTING.UNSET_SHIP: {
      return state.map((ship) => {
        if (ship.id === shipId) {
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
