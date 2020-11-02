import socketio from 'socket.io-client';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { CONNECT } from './actionTypes';
import { connectStage, settingStage } from './stages';
import { ConnectAction } from '../reducers/connect';
import { RootState } from '../reducers';
import { Player } from '../../models/Player';

export const establishConnection = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<any>
> => (dispatch) => {
  const io = socketio(process.env.REACT_APP_SOCKET_ENDPOINT as string);
  dispatch({ type: CONNECT.ESTABLISH, io });
  dispatch(connectStage());
};

export const connectPlayer = (
  player: Player,
): ThunkAction<void, RootState, unknown, ConnectAction> => (dispatch) => {
  dispatch({
    type: CONNECT.PLAYER,
    player,
  });
  dispatch(settingStage());
};
