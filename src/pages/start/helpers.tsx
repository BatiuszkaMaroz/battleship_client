import { Coords, Ship } from './types';

const BOARD_SIZE = 10;

/**
 * Returns coordinates of cell html element with given cellIndex.
 */
export function getCellCoords(cellIndex: number): Coords {
  const cell = document.querySelector(
    `#cell[data-index="${cellIndex}"]`,
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
 * Extract cell index value from data-index.
 */
export function getCellIndex(cell: HTMLElement): number {
  return +(cell.dataset.index as string);
}

/**
 * Creates a helper board to assist with ship placement by marking cells and their
 * surroundings with ship id.
 */
export function createHelperBoard(ships: Ship[]): string[][] {
  const matrix: string[][] = Array.from({ length: 10 }, () =>
    Array(10).fill(''),
  );

  function markCellWithSurroundingsAsUnavailable(
    row: number,
    col: number,
    shipId: string,
  ) {
    for (let i = row - 1; i <= row + 1; i++) {
      for (let j = col - 1; j <= col + 1; j++) {
        if (matrix[i] !== undefined && matrix[i][j] !== undefined) {
          matrix[i][j] = shipId;
        }
      }
    }
  }

  ships.forEach((s) => {
    const startRow = Math.floor(s.cellIndex / BOARD_SIZE);
    const startCol = s.cellIndex % BOARD_SIZE;

    if (s.orientation === 'h') {
      for (let i = startCol; i < startCol + s.size; i++) {
        markCellWithSurroundingsAsUnavailable(startRow, i, s.id);
      }
    }

    if (s.orientation === 'v') {
      for (let i = startRow; i < startRow + s.size; i++) {
        markCellWithSurroundingsAsUnavailable(i, startCol, s.id);
      }
    }
  });

  return matrix;
}

/**
 * Checks if ship with given size and orientation can be placed in the board.
 * More specifically it checks if ship will be within board borders.
 */
export function validateShipPlacement(
  cellIndex: number,
  shipSize: number,
  shipOrientation: 'h' | 'v',
) {
  const startRow = Math.floor(cellIndex / BOARD_SIZE);
  const startCol = cellIndex % BOARD_SIZE;
  const endRow = shipOrientation === 'h' ? startRow : startRow + shipSize - 1;
  const endCol = shipOrientation === 'h' ? startCol + shipSize - 1 : startCol;

  return (
    0 <= startRow && //
    endRow < BOARD_SIZE &&
    0 <= startCol &&
    endCol < BOARD_SIZE
  );
}

/**
 * Checks if there are available cells for placing ship with given size and
 * orientation based on helperBoard.
 */
export function validateShipBoardAvailability(
  cellIndex: number,
  helperBoard: string[][],
  shipId: string,
  shipSize: number,
  shipOrientation: 'h' | 'v',
) {
  const startRow = Math.floor(cellIndex / BOARD_SIZE);
  const startCol = cellIndex % BOARD_SIZE;

  if (shipOrientation === 'h') {
    for (let i = startCol; i < startCol + shipSize; i++) {
      if (
        helperBoard[startRow][i] === '' ||
        helperBoard[startRow][i] === shipId
      ) {
        continue;
      } else {
        return false;
      }
    }
  }

  if (shipOrientation === 'v') {
    for (let i = startRow; i < startRow + shipSize; i++) {
      if (
        helperBoard[i][startCol] === '' ||
        helperBoard[i][startCol] === shipId
      ) {
        continue;
      } else {
        return false;
      }
    }
  }

  return true;
}

export function createRandomizedShips() {
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

  ships.forEach((s) => {
    //
  });
}
