import { BOARD_COLS, BOARD_ROWS } from 'config/constants';
import { Ship } from 'stores/useSettingStore';

/* ========================= CONVERTING ========================= */

/**
 * Converts cellIndex to row and col.
 */
function convertCellIndexToRowCol(cellIndex: number) {
  const row = Math.floor(cellIndex / BOARD_COLS);
  const col = cellIndex - row * BOARD_COLS;

  return { row, col };
}

/**
 * Converts row and col to cellIndex.
 */
function convertRowColToCellIndex(row: number, col: number) {
  const cellIndex = row * BOARD_COLS + col;
  return cellIndex;
}

/* ========================= HTML ========================= */

/**
 * Extracts cell index value from data-index.
 */
export function getCellIndexFromCellElement(cell: HTMLElement) {
  return +(cell.dataset.index as string);
}

/**
 * Extracts cell index value from data-index.
 */
export function getRowColFromCellElement(cell: HTMLElement) {
  return convertCellIndexToRowCol(getCellIndexFromCellElement(cell));
}

/**
 * Returns coordinates of cell html element with given cellIndex.
 */
export function getCellCoordsFromRowCol(row: number, col: number) {
  const cellIndex = convertRowColToCellIndex(row, col);
  const cell = document.querySelector(
    `#setting-cell[data-index="${cellIndex}"]`,
  ) as HTMLDivElement;

  if (!cell) {
    throw new Error(`Cell with [data-index=${cellIndex}] not found.`);
  }

  return {
    left: cell.offsetLeft,
    top: cell.offsetTop,
  };
}

/* ========================= BOARD ========================= */

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
  const { row, col } = ship;

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
  return Array.from({ length: BOARD_ROWS }, () => Array(BOARD_COLS).fill(''));
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

/* ========================= VALIDATION ========================= */

/**
 * Checks if ship can be placed in proposed place according to board borders.
 */
function validateShipWithinBoardBorders(row: number, col: number, ship: Ship) {
  const startRow = row;
  const startCol = col;
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
  row: number,
  col: number,
  ship: Ship,
  helperBoard: string[][],
) {
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
  row: number,
  col: number,
  ship: Ship,
  board: string[][],
) {
  return (
    validateShipWithinBoardBorders(row, col, ship) &&
    validateShipBoardAvailability(row, col, ship, board)
  );
}

/**
 * Checks if ship can be rotated.
 */
export function validateShipRotation(ship: Ship, board: string[][]) {
  const proposedShip: Ship = {
    ...ship,
    orientation: ship.orientation === 'h' ? 'v' : 'h',
  };

  return validateShipPlacement(ship.row, ship.col, proposedShip, board);
}

/* ========================= RANDOMIZING ========================= */

function getRandomOrientation(): Ship['orientation'] {
  return Math.random() > 0.5 ? 'v' : 'h';
}

function getRandomRowCol() {
  return {
    row: Math.floor(Math.random() * BOARD_ROWS),
    col: Math.floor(Math.random() * BOARD_COLS),
  };
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
      const { row, col } = getRandomRowCol();
      if (board[row][col] !== '') continue;

      if (validateShipPlacement(row, col, s as Ship, board)) {
        s.row = row;
        s.col = col;
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
