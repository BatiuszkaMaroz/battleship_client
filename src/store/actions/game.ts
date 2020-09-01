import * as AT from './actionTypes';
import { GameAction } from '../reducers/game';
import { GameBoard } from '../../models/Board';

export const setGameBoard = (board: GameBoard): GameAction => {
  return { type: AT.SET_GAME_BOARD, board };
};
