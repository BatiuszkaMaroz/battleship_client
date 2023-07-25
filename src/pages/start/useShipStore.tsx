import { create } from 'zustand';

import {
  createHelperBoard,
  validateShipBoardAvailability,
  validateShipPlacement,
} from './helpers';
import { Ship } from './types';

const shipsDefault: Ship[] = [
  { id: '0', size: 4, cellIndex: 0, orientation: 'h' },
  { id: '1', size: 3, cellIndex: 10, orientation: 'h' },
  { id: '2', size: 3, cellIndex: 20, orientation: 'h' },
  { id: '3', size: 2, cellIndex: 30, orientation: 'h' },
  { id: '4', size: 2, cellIndex: 40, orientation: 'h' },
  { id: '5', size: 2, cellIndex: 50, orientation: 'h' },
  { id: '6', size: 1, cellIndex: 60, orientation: 'h' },
  { id: '7', size: 1, cellIndex: 70, orientation: 'h' },
  { id: '8', size: 1, cellIndex: 80, orientation: 'h' },
  { id: '9', size: 1, cellIndex: 90, orientation: 'h' },
];

interface ShipState {
  ships: Ship[];
  helperBoard: string[][];

  rotateShip: (shipId: string) => void;
  setShipCellIndex: (shipId: string, cellIndex: number) => void;
  canShipBePlaced: (shipId: string, cellIndex: number) => boolean;
}

export const useShipStore = create<ShipState>()((set, get) => ({
  ships: shipsDefault,
  helperBoard: createHelperBoard(shipsDefault),

  rotateShip: (shipId: string) =>
    set((state) => {
      const updatedShips: Ship[] = state.ships.map((s) => {
        if (s.id === shipId) {
          return { ...s, orientation: s.orientation === 'h' ? 'v' : 'h' };
        } else {
          return s;
        }
      });

      return {
        ships: updatedShips,
        helperBoard: createHelperBoard(updatedShips),
      };
    }),

  setShipCellIndex: (shipId: string, cellIndex: number) =>
    set((state) => {
      const updatedShips = state.ships.map((s) => {
        if (s.id === shipId) {
          return { ...s, cellIndex: cellIndex };
        } else {
          return s;
        }
      });

      return {
        ships: updatedShips,
        helperBoard: createHelperBoard(updatedShips),
      };
    }),

  canShipBePlaced: (shipId: string, cellIndex: number) => {
    const { ships, helperBoard } = get();
    const ship = ships.find((s) => s.id === shipId);
    if (!ship) return false;

    return (
      validateShipPlacement(cellIndex, ship.size, ship.orientation) &&
      validateShipBoardAvailability(
        cellIndex,
        helperBoard,
        ship.id,
        ship.size,
        ship.orientation,
      )
    );
  },
}));
