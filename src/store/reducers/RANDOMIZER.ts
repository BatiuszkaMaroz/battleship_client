const isFree = (
  i: number,
  j: number,
  board: any[][],
  size: number,
  shipId: string,
  orientation: 'horizontal' | 'vertical',
) => {
  if (orientation === 'horizontal') {
    for (let k = j; k < size + j; k++) {
      if (
        !board[i][k] ||
        (board[i][k].shipId !== shipId && board[i][k].shipId !== null)
      ) {
        return false;
      }
    }

    for (let k = i - 1; k < i + 2; k++) {
      for (let l = j - 1; l < j + size + 1; l++) {
        if (
          board[k] &&
          board[k][l] &&
          board[k][l].shipId !== null &&
          board[k] &&
          board[k][l] &&
          board[k][l].shipId !== shipId
        ) {
          return false;
        }
      }
    }
  } else if (orientation === 'vertical') {
    for (let k = i; k < i + size; k++) {
      if (
        !board[k] ||
        !board[k][j] ||
        (board[k][j].shipId !== shipId && board[k][j].shipId !== null)
      ) {
        return false;
      }
    }

    for (let k = i - 1; k < i + size + 1; k++) {
      for (let l = j - 1; l < j + 2; l++) {
        if (
          board[k] &&
          board[k][l] &&
          board[k][l].shipId !== shipId &&
          board[k][l].shipId !== null
        ) {
          return false;
        }
      }
    }
  }

  return true;
};

class Ship {
  id: string;
  settled: boolean = false;

  constructor(id: number, public size: number) {
    this.id = `ship-${id}`;
  }
}

const ships = [
  new Ship(0, 4),
  new Ship(1, 3),
  new Ship(2, 3),
  new Ship(3, 2),
  new Ship(4, 2),
  new Ship(5, 2),
  new Ship(6, 1),
  new Ship(7, 1),
  new Ship(8, 1),
  new Ship(9, 1),
];

//----------------------------------------------------------------------//

class Cell {
  id: string;
  shipId: string | null;

  constructor(public row: number, public col: number) {
    this.id = `${row}${col}`;

    this.shipId = null;
  }
}

const rows = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const cols = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const board = rows.map((row) => {
  return cols.map((col) => {
    return new Cell(row, col);
  });
});

//----------------------------------------------------------------------//

function randomize() {
  const rows = board.length;
  const cells = board[0].length;
  let orientation: 'horizontal' | 'vertical' = 'vertical';

  ships.forEach((ship) => {
    if (orientation === 'horizontal') {
      orientation = 'vertical';
    } else if (orientation === 'vertical') {
      orientation = 'horizontal';
    }

    if (orientation === 'horizontal') {
      const maxI = rows - 1;
      const maxJ = cells - ship.size;

      let positionI = Math.floor(Math.random() * (maxI + 1));
      let positionJ = Math.floor(Math.random() * (maxJ + 1));

      while (true) {
        if (
          isFree(positionI, positionJ, board, ship.size, ship.id, 'horizontal')
        ) {
          for (let j = 0; j < ship.size; j++) {
            board[positionI][positionJ + j].shipId = ship.id;
          }

          break;
        } else {
          positionI++;

          if (positionI > maxI) {
            positionJ++;
            positionI = 0;
          }

          if (positionJ > maxJ) {
            positionJ = 0;
          }
        }
      }
    } else if (orientation === 'vertical') {
      const maxI = rows - ship.size;
      const maxJ = cells - 1;

      let positionI = Math.floor(Math.random() * (maxI + 1));
      let positionJ = Math.floor(Math.random() * (maxJ + 1));

      while (true) {
        if (
          isFree(positionI, positionJ, board, ship.size, ship.id, 'vertical')
        ) {
          for (let i = 0; i < ship.size; i++) {
            board[positionI + i][positionJ].shipId = ship.id;
          }

          break;
        } else {
          positionJ++;

          if (positionJ > maxJ) {
            positionJ = 0;
            positionI++;
          }

          if (positionI > maxI) {
            positionI = 0;
          }
        }
      }
    }
  });

  console.log(board);
  return board;
}

export default randomize();
