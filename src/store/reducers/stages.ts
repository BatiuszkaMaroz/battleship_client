import { Action, Reducer } from 'redux';

import { STAGES } from 'store/actions/actionTypes';
export { STAGES } from 'store/actions/actionTypes';

const stagesReducer: Reducer<STAGES, Action> = (
  state = STAGES.INIT,
  { type },
) => {
  switch (type) {
    case STAGES.CONNECT:
      return STAGES.CONNECT;

    case STAGES.SETTING:
      return STAGES.SETTING;

    case STAGES.MATCHMAKING:
      return STAGES.MATCHMAKING;

    case STAGES.GAME:
      return STAGES.GAME;

    default:
      return state;
  }
};

export default stagesReducer;
