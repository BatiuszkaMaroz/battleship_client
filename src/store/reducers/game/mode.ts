import { Action, Reducer } from 'redux';
import { GAME } from '../../actions/actionTypes';

type ModeState = {
  mode?: 'random' | 'private' | 'invited';
  roomId?: string;
};
export type ModeAction = Action & { mode?: ModeState['mode']; roomId?: string };

const initialState: ModeState = {
  mode: 'random',
};

const modeReducer: Reducer<ModeState, ModeAction> = (
  state = initialState,
  { type, mode, roomId },
) => {
  switch (type) {
    case GAME.TOGGLE_MODE:
      return { ...state, mode };

    case GAME.SET_ROOM_ID:
      return { mode, roomId };

    case GAME.EXIT_INVITED:
      return { mode: 'random', roomId: undefined };

    default:
      return state;
  }
};

export default modeReducer;
