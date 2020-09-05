import socketio from 'socket.io-client';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import * as AT from './actionTypes';
import { ConnectAction } from '../reducers/connect';
import { RootState } from '../reducers';
import { Player } from '../../models/Player';

export const establishConnection = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<any>
> => async (dispatch) => {
  const io = socketio('http://localhost:5000');
  dispatch({ type: AT.ESTABLISH_CONNECTION, io });
};

export const connectPlayer = (player: Player): ConnectAction => ({
  type: AT.CONNECT_PLAYER,
  player,
});
