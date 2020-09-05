import { Action, Reducer } from 'redux';

import * as AT from '../actions/actionTypes';

export enum STATUS {
  INITIALIZED = 'INITIALIZED',
  CONNECT_STAGE = 'CONNECT_STAGE',
  SETTING_STAGE = 'SETTING_STAGE',
  MATCHMAKING_STAGE = 'MATCHMAKING_STAGE',
  GAME_STAGE = 'GAME_STAGE',
}

const statusReducer: Reducer<STATUS, Action> = (
  state = STATUS.INITIALIZED,
  { type },
) => {
  switch (type) {
    case AT.ESTABLISH_CONNECTION:
    case AT.CONNECT_STAGE:
      return STATUS.CONNECT_STAGE;

    case AT.CONNECT_PLAYER:
    case AT.SETTING_STAGE:
      return STATUS.SETTING_STAGE;

    case AT.SET_GAME_BOARD:
    case AT.MATCHMAKING_STAGE:
      return STATUS.MATCHMAKING_STAGE;

    case AT.GAME_STAGE:
      return STATUS.GAME_STAGE;

    default:
      return state;
  }
};

export default statusReducer;
