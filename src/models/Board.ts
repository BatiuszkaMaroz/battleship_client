const rows = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const cols = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

abstract class CellBase {
  id: string;

  constructor(public row: number, public col: number) {
    this.id = `${row * cols.length + col}`;
  }
}
class SettingCell extends CellBase {
  shipId?: string | null = null;
}

class GameCell extends CellBase {
  shipId?: string | null = null;
  hit: boolean = false;
}

class EnemyCell extends CellBase {
  ship: boolean = false;
  hit: boolean = false;
}

export type SettingBoard = SettingCell[][];
export type GameBoard = GameCell[][];
export type EnemyBoard = EnemyCell[][];

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
      return new EnemyCell(row, col);
    });
  });

  return board;
};
