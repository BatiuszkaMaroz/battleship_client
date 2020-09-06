import { ThunkAction } from 'redux-thunk';
import * as AT from './actionTypes';
import { resetGameFull, resetGame } from './game';

export const connectStage = () => ({
  type: AT.CONNECT_STAGE,
});

export const settingStage = (): ThunkAction<any, any, any, any> => (
  dispatch,
) => {
  dispatch({
    type: AT.SETTING_STAGE,
  });
  dispatch(resetGameFull());
};

export const matchmakingStage = (): ThunkAction<any, any, any, any> => (
  dispatch,
) => {
  dispatch({
    type: AT.MATCHMAKING_STAGE,
  });
  dispatch(resetGame());
};

export const gameStage = () => ({
  type: AT.GAME_STAGE,
});
