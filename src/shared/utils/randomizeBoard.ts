import isPlaceFree from './isPlaceFree';
import { createBoard } from '../../models/Board';
import { createShips } from '../../models/Ship';

function randomizeBoard() {
  const board = createBoard();
  const ships = createShips();

  const rows = board.length;
  const cells = board[0].length;
  let orientation: 'horizontal' | 'vertical';

  const firstDraw = !!Math.round(Math.random());

  if (firstDraw) {
    orientation = 'horizontal';
  } else {
    orientation = 'vertical';
  }

  ships.forEach((ship) => {
    if (orientation === 'horizontal') {
      orientation = 'vertical';
    } else {
      orientation = 'horizontal';
    }

    if (orientation === 'horizontal') {
      const maxRow = rows - 1;
      const maxCol = cells - ship.size;

      let positionRow = Math.floor(Math.random() * (maxRow + 1));
      let positionCol = Math.floor(Math.random() * (maxCol + 1));

      while (true) {
        if (
          isPlaceFree(
            positionRow,
            positionCol,
            board,
            ship.size,
            ship.id,
            'horizontal',
          )
        ) {
          for (let j = 0; j < ship.size; j++) {
            board[positionRow][positionCol + j].shipId = ship.id;
          }

          break;
        } else {
          positionRow++;

          if (positionRow > maxRow) {
            positionCol++;
            positionRow = 0;
          }

          if (positionCol > maxCol) {
            positionCol = 0;
          }
        }
      }
    } else if (orientation === 'vertical') {
      const maxRow = rows - ship.size;
      const maxCol = cells - 1;

      let positionRow = Math.floor(Math.random() * (maxRow + 1));
      let positionCol = Math.floor(Math.random() * (maxCol + 1));

      while (true) {
        if (
          isPlaceFree(
            positionRow,
            positionCol,
            board,
            ship.size,
            ship.id,
            'vertical',
          )
        ) {
          for (let i = 0; i < ship.size; i++) {
            board[positionRow + i][positionCol].shipId = ship.id;
          }

          break;
        } else {
          positionCol++;

          if (positionCol > maxCol) {
            positionCol = 0;
            positionRow++;
          }

          if (positionRow > maxRow) {
            positionRow = 0;
          }
        }
      }
    }
  });

  return board;
}

export default randomizeBoard;
