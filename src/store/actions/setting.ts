import * as AT from './actionTypes';
import { BoardAction } from '../reducers/settings/board';
import { ShipsAction } from '../reducers/settings/ships';

type SettingAction = BoardAction & ShipsAction;

export const setShip = (
  shipId: string,
  shipSize: number,
  row: number,
  col: number,
  orientation: 'horizontal' | 'vertical',
): SettingAction => {
  return { type: AT.SET_SHIP, shipId, shipSize, row, col, orientation };
};

export const unsetShip = (shipId: string): SettingAction => {
  return { type: AT.UNSET_SHIP, shipId };
};

export const resetBoard = () => ({ type: AT.RESET_BOARD });
export const randomizeBoard = () => ({ type: AT.RANDOMIZE_BOARD });
