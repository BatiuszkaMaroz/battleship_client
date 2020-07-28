import React from 'react';

import Cell from '../Cell/Cell';

import useTypedSelector from '../../../shared/hooks/useTypedSelector';
import styles from './Board.module.scss';

const Board: React.FC = () => {
  const board = useTypedSelector((state) => state.board);

  const boardElement = () =>
    board.map((row, idx) => (
      <ul className={styles.Row} key={idx}>
        {row.map((cell) => (
          <Cell
            className={styles.Cell}
            key={cell.id}
            id={cell.id}
            row={cell.row}
            col={cell.col}
          />
        ))}
      </ul>
    ));

  return <div className={styles.Board}>{boardElement()}</div>;
};

export default Board;
