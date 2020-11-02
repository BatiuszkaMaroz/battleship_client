const rows = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const cols = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

abstract class Cell {
  id: string;

  constructor(public row: number, public col: number) {
    this.id = `${row * cols.length + col}`;
  }
}
class SettingCell extends Cell {
  shipId?: string | null = null;
}

class GameCell<T> extends Cell {
  shipId?: T | null = null;
  hit: boolean = false;
}

export type SettingBoard = SettingCell[][];
export type PlayerBoard = GameCell<string>[][];
export type EnemyBoard = GameCell<boolean>[][];

export const createSettingBoard = (): SettingBoard => {
  const board = rows.map((row) => {
    return cols.map((col) => {
      return new SettingCell(row, col);
    });
  });

  return board;
};

export const createEnemyBoard = (): EnemyBoard => {
  const board = rows.map((row) => {
    return cols.map((col) => {
      return new GameCell<boolean>(row, col);
    });
  });

  return board;
};
