import { create } from 'zustand';

import {
  createRandomizedShipsAndBoard,
  createShipBoard,
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
  board: string[][];

  rotateShip: (shipId: string) => void;
  placeShip: (shipId: string, cellIndex: number) => void;

  randomizeShips: () => void;
  validateShipPlacement: (shipId: string, cellIndex: number) => boolean;
}

export const useShipStore = create<ShipState>()((set, get) => ({
  ships: shipsDefault,
  board: createShipBoard(shipsDefault), // acts as a helper in ship placement

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
        board: createShipBoard(updatedShips),
      };
    }),

  placeShip: (shipId: string, cellIndex: number) =>
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
        board: createShipBoard(updatedShips),
      };
    }),

  randomizeShips: () =>
    set(() => {
      const { ships, board } = createRandomizedShipsAndBoard();
      return { ships, board };
    }),

  validateShipPlacement: (shipId: string, proposedCellIndex: number) => {
    const { ships, board } = get();
    const ship = ships.find((s) => s.id === shipId);

    return !!ship && validateShipPlacement(proposedCellIndex, ship, board);
  },
}));
