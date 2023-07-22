import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import socketio from 'socket.io-client';
import { Player } from '../../models/Player';
import { RootState } from '../reducers';
import { ConnectAction } from '../reducers/connect';
import { CONNECT } from './actionTypes';
import { connectStage, settingStage } from './stages';

let called = false;

export const establishConnection =
  (): ThunkAction<void, RootState, unknown, Action<any>> => (dispatch) => {
    if (called) return;
    called = true;

    console.log('establishing connection');
    const io = socketio(process.env.SOCKET_ENDPOINT!);
    dispatch({ type: CONNECT.ESTABLISH, io });
    dispatch(connectStage());
  };

export const connectPlayer =
  (player: Player): ThunkAction<void, RootState, unknown, ConnectAction> =>
  (dispatch) => {
    dispatch({
      type: CONNECT.PLAYER,
      player,
    });
    dispatch(settingStage());
  };
