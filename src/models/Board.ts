const rows = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const cols = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

class Cell {
  id: string;
  shipId?: string | null;

  constructor(public row: number, public col: number) {
    this.id = `${row * cols.length + col}`;

    this.shipId = null;
  }
}

class GameCell extends Cell {
  hit: boolean = false;
}

class EnemyCell extends GameCell {
  shipId = undefined;
}

export type Board = Cell[][];
export type GameBoard = GameCell[][];
export type EnemyBoard = EnemyCell[][];

export const createBoard = (): Board => {
  const board = rows.map((row) => {
    return cols.map((col) => {
      return new Cell(row, col);
    });
  });

  return board;
};

export const createEnemyBoard = (): EnemyBoard => {
  const board = rows.map((row) => {
    return cols.map((col) => {
      return new EnemyCell(row, col);
    });
  });

  return board;
};
