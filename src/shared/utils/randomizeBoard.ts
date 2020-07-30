import isPlaceFree from './isPlaceFree';
import { createBoard } from '../../store/reducers/board';
import { createShips } from '../../store/reducers/ships';

function randomizeBoard() {
  const board = createBoard();
  const ships = createShips();

  const rows = board.length;
  const cells = board[0].length;
  let orientation: 'horizontal' | 'vertical';

  const firstDraw = Math.round(Math.random());

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
      const maxI = rows - 1;
      const maxJ = cells - ship.size;

      let positionI = Math.floor(Math.random() * (maxI + 1));
      let positionJ = Math.floor(Math.random() * (maxJ + 1));

      while (true) {
        if (
          isPlaceFree(
            positionI,
            positionJ,
            board,
            ship.size,
            ship.id,
            'horizontal',
          )
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
          isPlaceFree(
            positionI,
            positionJ,
            board,
            ship.size,
            ship.id,
            'vertical',
          )
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

  return board;
}

export default randomizeBoard;
