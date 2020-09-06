import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { TurnAction } from '../reducers/game/turn';
import { GameBoard } from '../../models/Board';
import { RootState } from '../reducers/index';
import { PlayerBoardAction } from '../reducers/game/playerBoard';
import * as AT from './actionTypes';
import { matchmakingStage } from './stages';

export const setGameBoard = (
  board: GameBoard,
  matchmaking: boolean,
): ThunkAction<any, RootState, any, PlayerBoardAction> => (dispatch) => {
  dispatch({
    type: AT.SET_GAME_BOARDS,
    board,
  });

  if (matchmaking) {
    dispatch(matchmakingStage());
  }
};

export const setTurnId = (turnId: number): TurnAction => ({
  type: AT.SET_TURN_ID,
  turnId,
});

export const turnChange = (
  turn: number,
): ThunkAction<any, RootState, any, TurnAction> => (dispatch, getState) => {
  const playerTurn = getState().game.turn.turnId;

  dispatch({ type: AT.TURN_CHANGE, yourTurn: playerTurn === turn });
};

export const resetGame = (): Action => ({
  type: AT.RESET_GAME,
});

export const resetGameFull = (): Action => ({
  type: AT.RESET_GAME_FULL,
});
