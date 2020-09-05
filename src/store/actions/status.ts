import * as AT from './actionTypes';

export const connectStage = () => ({
  type: AT.CONNECT_STAGE,
});

export const settingStage = () => ({
  type: AT.SETTING_STAGE,
});

export const matchmakingStage = () => ({
  type: AT.MATCHMAKING_STAGE,
});

export const gameStage = () => ({
  type: AT.GAME_STAGE,
});
