import { Action, Reducer } from 'redux';
import * as AT from '../../actions/actionTypes';

export type TurnAction = Action & { turnId: number };
type TurnState = null | number;

const initialState = null;

const turnReducer: Reducer<TurnState, TurnAction> = (
  state = initialState,
  { type, turnId },
) => {
  switch (type) {
    case AT.SET_TURN_ID:
      return turnId;

    default: {
      return state;
    }
  }
};

export default turnReducer;
