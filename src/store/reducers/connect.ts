import { Action, Reducer } from 'redux';

import { CONNECT } from '../actions/actionTypes';
import { Player } from '../../models/Player';

type ConnectState = {
  io: null | SocketIOClient.Socket;
  player: null | Player;
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
    case CONNECT.PLAYER:
      return { ...state, player: player! };

    case CONNECT.ESTABLISH:
      return { ...state, io: io! };

    default:
      return state;
  }
};

export default connectReducer;
