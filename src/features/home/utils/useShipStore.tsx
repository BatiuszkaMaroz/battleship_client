import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import {
  createShipBoard,
  generateRandomizedShipsAndBoard,
  validateShipPlacement,
  validateShipRotation,
} from './helpers';
import { Ship } from './types';

const { ships, board } = generateRandomizedShipsAndBoard();
interface ShipState {
  ships: Ship[];
  board: string[][];

  rotateShip: (shipId: string) => void;
  placeShip: (shipId: string, cellIndex: number) => void;

  randomizeShips: () => void;
  validateShipPlacement: (shipId: string, cellIndex: number) => boolean;
  validateShipRotation: (shipId: string) => boolean;
}

export const useShipStore = create<ShipState>()(
  devtools((set, get) => ({
    ships,
    board, // acts as a helper in ship placement

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
        const { ships, board } = generateRandomizedShipsAndBoard();
        return { ships, board };
      }),

    validateShipPlacement: (shipId: string, proposedCellIndex: number) => {
      const { ships, board } = get();
      const ship = ships.find((s) => s.id === shipId);

      return !!ship && validateShipPlacement(proposedCellIndex, ship, board);
    },

    validateShipRotation: (shipId: string) => {
      const { ships, board } = get();
      const ship = ships.find((s) => s.id === shipId);

      return !!ship && validateShipRotation(ship, board);
    },
  })),
);
