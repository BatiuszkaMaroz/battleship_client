import { Action, Reducer } from 'redux';

import * as AT from '../actions/actionTypes';
import { Player } from '../../models/Player';

type ConnectState = {
  io: null | SocketIOClient.Socket;
  player: null | any;
};

export type ConnectAction = Action & {
  io?: SocketIOClient.Socket;
  player?: null | Player;
};

const initialState: ConnectState = {
  io: null,
  player: null,
};

const connectReducer: Reducer<ConnectState, ConnectAction> = (
  state = initialState,
  { type, io, player },
) => {
  switch (type) {
    case AT.CONNECT_PLAYER:
      return { ...state, player: player! };

    case AT.ESTABLISH_CONNECTION:
      return { ...state, io: io! };

    default:
      return state;
  }
};

export default connectReducer;
