import * as AT from './actionTypes';
import { BoardAction } from '../reducers/board';
import { ShipsAction } from '../reducers/ships';

type SettingAction = BoardAction & ShipsAction;

export const setShip = (
  shipId: string,
  shipSize: number,
  i: number,
  j: number,
  orientation: 'horizontal' | 'vertical',
): SettingAction => {
  return { type: AT.SET_SHIP, shipId, shipSize, i, j, orientation };
};

export const unsetShip = (shipId: string): SettingAction => {
  return { type: AT.UNSET_SHIP, shipId };
};

export const resetBoard = () => ({ type: AT.RESET_BOARD });
export const randomizeBoard = () => ({ type: AT.RANDOMIZE_BOARD });
