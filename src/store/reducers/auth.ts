import { Action, Reducer } from 'redux';
import * as AT from '../actions/actionTypes';

interface IAuthState {
  io: null | SocketIOClient.Socket;
  player: null | any;
}

export interface IAuthAction extends Action {
  io?: SocketIOClient.Socket;
  player?: null | any;
}

const initialState: IAuthState = {
  io: null,
  player: null,
};

const connectReducer: Reducer<IAuthState, IAuthAction> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case AT.JOIN_PLAYER:
    case AT.CONNECT_PLAYER:
      return { ...state, player: action.player };
    case AT.ESTABLISH_CONNECTION:
      return { ...state, io: action.io } as IAuthState;
    default:
      return state;
  }
};

export default connectReducer;
