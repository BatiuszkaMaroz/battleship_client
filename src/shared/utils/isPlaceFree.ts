const isPlaceFree = (
  row: number,
  col: number,
  board: any[][],
  size: number,
  shipId: string,
  orientation: 'horizontal' | 'vertical',
) => {
  if (orientation === 'horizontal') {
    // * If cell don't exists or cell is busied by other ship * //
    for (let k = col; k < size + col; k++) {
      if (
        !board[row][k] ||
        (board[row][k].shipId !== shipId && board[row][k].shipId !== null)
      ) {
        return false;
      }
    }

    // * If cell exists and is busied by other ship * //
    for (let k = row - 1; k < row + 2; k++) {
      for (let l = col - 1; l < col + size + 1; l++) {
        if (
          board[k] &&
          board[k][l] &&
          board[k][l].shipId !== null &&
          board[k][l].shipId !== shipId
        ) {
          return false;
        }
      }
    }
  } else if (orientation === 'vertical') {
    // * If cell don't exists or cell is busied by other ship * //
    for (let k = row; k < row + size; k++) {
      if (
        !board[k] ||
        !board[k][col] ||
        (board[k][col].shipId !== shipId && board[k][col].shipId !== null)
      ) {
        return false;
      }
    }

    // * If cell exists and is busied by other ship * //
    for (let k = row - 1; k < row + size + 1; k++) {
      for (let l = col - 1; l < col + 2; l++) {
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

export default isPlaceFree;
