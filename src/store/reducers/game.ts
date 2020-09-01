import { Action, Reducer } from 'redux';
import { GameBoard, createGameBoard } from '../../models/Board';
import * as AT from '../actions/actionTypes';

// interface GameCell extends Cell {
interface GameCell {
  hit: boolean;
}

interface GameState {
  playerBoard: GameBoard | null;
  enemyBoard: GameBoard | null;
}

export interface GameAction extends Action {
  board?: GameBoard;
}

const initialState: GameState = {
  playerBoard: null,
  enemyBoard: null,
};

const gameReducer: Reducer<GameState, GameAction> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case AT.SET_GAME_BOARD:
      return { enemyBoard: createGameBoard(), playerBoard: action.board! };
    default: {
      return state;
    }
  }
};

export default gameReducer;
