import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { TurnAction } from '../reducers/game/turn';
import { GameBoard, EnemyBoard } from '../../models/Board';
import { RootState } from '../reducers/index';
import { PlayerBoardAction } from '../reducers/game/playerBoard';
import { EnemyBoardAction } from '../reducers/game/enemyBoard';
import { GAME } from './actionTypes';
import { matchmakingStage } from './stages';

export const setPlayerBoard = (
  board: GameBoard,
  matchmaking: boolean = false,
): ThunkAction<any, RootState, any, PlayerBoardAction> => (dispatch) => {
  dispatch({
    type: GAME.SET_PLAYER_BOARD,
    board,
  });

  if (matchmaking) {
    dispatch(matchmakingStage());
  }
};

export const setEnemyBoard = (
  board: EnemyBoard,
): ThunkAction<any, RootState, any, EnemyBoardAction> => (dispatch) => {
  dispatch({
    type: GAME.SET_ENEMY_BOARD,
    board,
  });
};

export const setTurnId = (turnId: number): TurnAction => ({
  type: GAME.SET_TURN_ID,
  turnId,
});

export const turnChange = (
  turn: number,
): ThunkAction<any, RootState, any, TurnAction> => (dispatch, getState) => {
  const playerTurn = getState().game.turn.turnId;

  dispatch({ type: GAME.TURN_CHANGE, yourTurn: playerTurn === turn });
};

export const resetGame = (): Action => ({
  type: GAME.RESET,
});

export const resetGameFull = (): Action => ({
  type: GAME.RESET_FULL,
});
