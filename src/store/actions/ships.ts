import * as AT from './actionTypes';

export const setCurrentCell = (shipId: string, newCell: HTMLDivElement) => {
  return { type: AT.SET_CURRENT_CELL, shipId, newCell };
};
