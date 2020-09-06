import * as AT from './actionTypes';
import { TurnAction } from '../reducers/game/turn';
import { PlayerBoardAction } from '../reducers/game/playerBoard';
import { GameBoard } from '../../models/Board';

export const setGameBoard = (board: GameBoard): PlayerBoardAction => ({
  type: AT.SET_GAME_BOARDS,
  board,
});

export const unsetGameBoard = (): PlayerBoardAction => ({
  type: AT.UNSET_GAME_BOARDS,
});

export const setTurnId = (turnId: number): TurnAction => ({
  type: AT.SET_TURN_ID,
  turnId,
});
