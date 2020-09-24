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
> => async (dispatch) => {
  const io = socketio('http://localhost:5000');
  dispatch({ type: CONNECT.ESTABLISH, io });
  dispatch(connectStage());
};

export const connectPlayer = (
  player: Player,
): ThunkAction<any, RootState, any, ConnectAction> => (dispatch) => {
  dispatch({
    type: CONNECT.PLAYER,
    player,
  });
  dispatch(settingStage());
};
