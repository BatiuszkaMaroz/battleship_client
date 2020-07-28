import socketio from 'socket.io-client';

import * as AT from './actionTypes';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { IAuthAction } from '../reducers/auth';
import { RootState } from '../reducers';

export const establishConnection = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<any>
> => async (dispatch) => {
  const io = socketio('http://localhost:5000');
  dispatch({ type: AT.ESTABLISH_CONNECTION, io });
};

export const connectPlayer = (player: any): IAuthAction => ({
  type: AT.CONNECT_PLAYER,
  player,
});

export const joinRoom = (player: any): IAuthAction => ({
  type: AT.JOIN_PLAYER,
  player,
});
