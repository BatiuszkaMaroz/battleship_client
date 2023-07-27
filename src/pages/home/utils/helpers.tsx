import { BOARD_COLS, BOARD_ROWS } from 'config/constants';
import { Coords, Ship } from './types';

/**
 * Returns coordinates of cell html element with given cellIndex.
 */
export function getCellCoords(cellIndex: number): Coords {
  const cell = document.querySelector(
    `#setting-cell[data-index="${cellIndex}"]`,
  ) as HTMLDivElement;

  if (!cell) {
    throw new Error(`Cell with [data-index=${cellIndex}] not found.`);
  }

  return {
    x: cell.offsetLeft,
    y: cell.offsetTop,
  };
}

/**
 * Extracts cell index value from data-index.
 */
export function getCellIndex(cell: HTMLElement): number {
  return +(cell.dataset.index as string);
}

/**
 * Converts cellIndex to row and col.
 */
export function convertCellIndexToRowCol(cellIndex: number) {
  const row = Math.floor(cellIndex / BOARD_COLS);
  const col = cellIndex - row * BOARD_COLS;

  return { row, col };
}

/* ============================================================ */

/**
 * Marks cell and it's surroundings with given shipId.
 */
function markCellWithSurroundings(
  row: number,
  col: number,
  shipId: string,
  board: string[][],
): void {
  for (let i = row - 1; i <= row + 1; i++) {
    for (let j = col - 1; j <= col + 1; j++) {
      if (board[i]?.[j] !== undefined) {
        if (!board[i][j].includes(shipId)) board[i][j] += shipId;
      }
    }
  }
}

/**
 * Marks ship and it's surroundings on the board using ship id.
 */
function markShipOnBoard(ship: Ship, board: string[][]): void {
  const { row, col } = convertCellIndexToRowCol(ship.cellIndex);

  if (ship.orientation === 'h') {
    for (let i = col; i < col + ship.size; i++) {
      markCellWithSurroundings(row, i, ship.id, board);
    }
  }

  if (ship.orientation === 'v') {
    for (let i = row; i < row + ship.size; i++) {
      markCellWithSurroundings(i, col, ship.id, board);
    }
  }
}

/**
 * Creates empty board.
 */
function createEmptyShipBoard(): string[][] {
  return Array.from({ length: 10 }, () => Array(10).fill(''));
}

/**
 * Creates a helper board to assist with ship placement by marking cells and their
 * surroundings with ship id.
 */
export function createShipBoard(ships: Ship[]): string[][] {
  const board = createEmptyShipBoard();

  ships.forEach((s) => {
    markShipOnBoard(s, board);
  });

  return board;
}

/* ============================================================ */

/**
 * Checks if ship can be placed in proposed place according to board borders.
 */
function validateShipWithinBoardBorders(proposedCellIndex: number, ship: Ship) {
  const { row: startRow, col: startCol } =
    convertCellIndexToRowCol(proposedCellIndex);
  const endRow = ship.orientation === 'h' ? startRow : startRow + ship.size - 1;
  const endCol = ship.orientation === 'h' ? startCol + ship.size - 1 : startCol;

  return (
    0 <= startRow && //
    endRow < BOARD_ROWS &&
    0 <= startCol &&
    endCol < BOARD_COLS
  );
}

/**
 * Checks if ship can be placed in proposed place according to board availability.
 */
function validateShipBoardAvailability(
  proposedCellIndex: number,
  ship: Ship,
  helperBoard: string[][],
) {
  const { row, col } = convertCellIndexToRowCol(proposedCellIndex);

  if (ship.orientation === 'h') {
    for (let i = col; i < col + ship.size; i++) {
      if (helperBoard[row][i] === '' || helperBoard[row][i] === ship.id) {
        continue;
      } else {
        return false;
      }
    }
  }

  if (ship.orientation === 'v') {
    for (let i = row; i < row + ship.size; i++) {
      if (helperBoard[i][col] === '' || helperBoard[i][col] === ship.id) {
        continue;
      } else {
        return false;
      }
    }
  }

  return true;
}

/**
 * Checks if ship can be placed in proposed place.
 */
export function validateShipPlacement(
  proposedCellIndex: number,
  ship: Ship,
  board: string[][],
) {
  return (
    validateShipWithinBoardBorders(proposedCellIndex, ship) &&
    validateShipBoardAvailability(proposedCellIndex, ship, board)
  );
}

export function validateShipRotation(ship: Ship, board: string[][]) {
  const proposedShip: Ship = {
    ...ship,
    orientation: ship.orientation === 'h' ? 'v' : 'h',
  };

  return validateShipPlacement(ship.cellIndex, proposedShip, board);
}

/* ============================================================ */

function getRandomOrientation(): Ship['orientation'] {
  return Math.random() > 0.5 ? 'v' : 'h';
}

function getRandomCellIndex(): Ship['cellIndex'] {
  return Math.floor(Math.random() * BOARD_COLS * BOARD_ROWS);
}

export function generateRandomizedShipsAndBoard(): {
  ships: Ship[];
  board: string[][];
} {
  const ships: Partial<Ship>[] = [
    { id: '0', size: 4 },
    { id: '1', size: 3 },
    { id: '2', size: 3 },
    { id: '3', size: 2 },
    { id: '4', size: 2 },
    { id: '5', size: 2 },
    { id: '6', size: 1 },
    { id: '7', size: 1 },
    { id: '8', size: 1 },
    { id: '9', size: 1 },
  ];

  const board = createEmptyShipBoard();

  ships.forEach((s) => {
    s.orientation = getRandomOrientation();

    while (true) {
      const proposedCellIndex = getRandomCellIndex();
      const { row, col } = convertCellIndexToRowCol(proposedCellIndex);

      if (board[row][col] !== '') continue;

      if (validateShipPlacement(proposedCellIndex, s as Ship, board)) {
        s.cellIndex = proposedCellIndex;
        markShipOnBoard(s as Ship, board);
        break;
      }
    }
  });

  return {
    ships: ships as Ship[],
    board,
  };
}
