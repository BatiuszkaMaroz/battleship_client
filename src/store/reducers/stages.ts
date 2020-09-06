import { Action, Reducer } from 'redux';

import * as AT from '../actions/actionTypes';

export enum STAGE {
  INITIALIZED = 'INITIALIZED',
  CONNECT_STAGE = 'CONNECT_STAGE',
  SETTING_STAGE = 'SETTING_STAGE',
  MATCHMAKING_STAGE = 'MATCHMAKING_STAGE',
  GAME_STAGE = 'GAME_STAGE',
}

const stagesReducer: Reducer<STAGE, Action> = (
  state = STAGE.INITIALIZED,
  { type },
) => {
  switch (type) {
    case AT.CONNECT_STAGE:
      return STAGE.CONNECT_STAGE;

    case AT.SETTING_STAGE:
      return STAGE.SETTING_STAGE;

    case AT.MATCHMAKING_STAGE:
      return STAGE.MATCHMAKING_STAGE;

    case AT.GAME_STAGE:
      return STAGE.GAME_STAGE;

    default:
      return state;
  }
};

export default stagesReducer;
