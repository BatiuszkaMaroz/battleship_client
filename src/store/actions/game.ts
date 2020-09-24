import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { TurnAction } from '../reducers/game/turn';
import { GameBoard } from '../../models/Board';
import { RootState } from '../reducers/index';
import { PlayerBoardAction } from '../reducers/game/playerBoard';
import { GAME } from './actionTypes';
import { matchmakingStage } from './stages';

export const setGameBoard = (
  board: GameBoard,
  matchmaking: boolean,
): ThunkAction<any, RootState, any, PlayerBoardAction> => (dispatch) => {
  dispatch({
    type: GAME.SET_BOARDS,
    board,
  });

  if (matchmaking) {
    dispatch(matchmakingStage());
  }
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
