import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import {
  createShipBoard,
  generateRandomizedShipsAndBoard,
  validateShipPlacement,
  validateShipRotation,
} from './functions';
import { Ship } from './types';

const { ships, board } = generateRandomizedShipsAndBoard();
interface ShipState {
  ships: Ship[];
  board: string[][];

  rotateShip: (shipId: string) => void;
  placeShip: (shipId: string, row: number, col: number) => void;

  randomizeShips: () => void;
  validateShipPlacement: (shipId: string, row: number, col: number) => boolean;
  validateShipRotation: (shipId: string) => boolean;
}

export const useShipStore = create<ShipState>()(
  devtools((set, get) => ({
    ships,
    board, // acts as a helper in ship placement

    rotateShip: (shipId) =>
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

    placeShip: (shipId, row, col) =>
      set((state) => {
        const updatedShips: Ship[] = state.ships.map((s) => {
          if (s.id === shipId) {
            return { ...s, row, col };
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
        const { ships, board } = generateRandomizedShipsAndBoard();
        return { ships, board };
      }),

    validateShipPlacement: (shipId, row, col) => {
      const { ships, board } = get();
      const ship = ships.find((s) => s.id === shipId);

      return !!ship && validateShipPlacement(row, col, ship, board);
    },

    validateShipRotation: (shipId) => {
      const { ships, board } = get();
      const ship = ships.find((s) => s.id === shipId);

      return !!ship && validateShipRotation(ship, board);
    },
  })),
);
