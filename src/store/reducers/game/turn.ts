import { Action, Reducer } from 'redux';
import * as AT from '../../actions/actionTypes';

export type TurnAction = Action & { turnId?: number; yourTurn?: boolean };
type TurnState = { turnId: number | null; yourTurn: boolean | null };

const initialState = { turnId: null, yourTurn: null };

const turnReducer: Reducer<TurnState, TurnAction> = (
  state = initialState,
  { type, turnId, yourTurn },
) => {
  switch (type) {
    case AT.SET_TURN_ID:
      return { ...state, turnId: turnId! };

    case AT.TURN_CHANGE:
      return { ...state, yourTurn: yourTurn! };

    case AT.RESET_GAME:
    case AT.RESET_GAME_FULL:
      return initialState;

    default: {
      return state;
    }
  }
};

export default turnReducer;
