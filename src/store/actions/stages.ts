import { ThunkAction } from 'redux-thunk';
import { STAGES } from './actionTypes';
import { resetGameFull, resetGame } from './game';

export const connectStage = () => ({
  type: STAGES.CONNECT,
});

export const settingStage = (): ThunkAction<any, any, any, any> => (
  dispatch,
) => {
  dispatch(resetGameFull());
  dispatch({
    type: STAGES.SETTING,
  });
};

export const matchmakingStage = (): ThunkAction<any, any, any, any> => (
  dispatch,
) => {
  dispatch(resetGame());
  dispatch({
    type: STAGES.MATCHMAKING,
  });
};

export const gameStage = () => ({
  type: STAGES.GAME,
});
