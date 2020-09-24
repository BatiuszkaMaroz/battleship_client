import { Action, Reducer } from 'redux';
import { GAME } from '../../actions/actionTypes';

export type TurnAction = Action & { turnId?: number; yourTurn?: boolean };
type TurnState = { turnId: number | null; yourTurn: boolean | null };

const initialState = { turnId: null, yourTurn: null };

const turnReducer: Reducer<TurnState, TurnAction> = (
  state = initialState,
  { type, turnId, yourTurn },
) => {
  switch (type) {
    case GAME.SET_TURN_ID:
      return { ...state, turnId: turnId! };

    case GAME.TURN_CHANGE:
      return { ...state, yourTurn: yourTurn! };

    case GAME.RESET:
    case GAME.RESET_FULL:
      return initialState;

    default: {
      return state;
    }
  }
};

export default turnReducer;
