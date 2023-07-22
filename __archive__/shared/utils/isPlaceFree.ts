import { SettingBoard } from 'models/Board';

const isPlaceFree = (
  row: number,
  col: number,
  board: SettingBoard,
  size: number,
  shipId: string,
  orientation: 'horizontal' | 'vertical',
) => {
  if (orientation === 'horizontal') {
    // * INNER If cell don't exists or cell is busied by other ship * //
    for (let i = col; i < size + col; i++) {
      if (
        !board[row] ||
        !board[row][i] ||
        (board[row][i].shipId !== shipId && board[row][i].shipId !== null)
      ) {
        return false;
      }
    }

    // * OUTER If cell exists and is busied by other ship * //
    for (let i = row - 1; i < row + 2; i++) {
      for (let j = col - 1; j < col + size + 1; j++) {
        if (
          board[i] &&
          board[i][j] &&
          board[i][j].shipId !== null &&
          board[i][j].shipId !== shipId
        ) {
          return false;
        }
      }
    }
  } else if (orientation === 'vertical') {
    // * INNER If cell don't exists or cell is busied by other ship * //
    for (let i = row; i < row + size; i++) {
      if (
        !board[i] ||
        !board[i][col] ||
        (board[i][col].shipId !== shipId && board[i][col].shipId !== null)
      ) {
        return false;
      }
    }

    // * OUTER If cell exists and is busied by other ship * //
    for (let i = row - 1; i < row + size + 1; i++) {
      for (let j = col - 1; j < col + 2; j++) {
        if (
          board[i] &&
          board[i][j] &&
          board[i][j].shipId !== shipId &&
          board[i][j].shipId !== null
        ) {
          return false;
        }
      }
    }
  }

  return true;
};

export default isPlaceFree;
