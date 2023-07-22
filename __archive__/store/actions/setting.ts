import { SETTING } from './actionTypes';
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
  return { type: SETTING.SET_SHIP, shipId, shipSize, row, col, orientation };
};

export const unsetShip = (shipId: string): SettingAction => {
  return { type: SETTING.UNSET_SHIP, shipId };
};

export const resetBoard = () => ({ type: SETTING.RESET_BOARD });
export const randomizeBoard = () => ({ type: SETTING.RANDOMIZE_BOARD });
