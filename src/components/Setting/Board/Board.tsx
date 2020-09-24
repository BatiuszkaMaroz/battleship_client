import React from 'react';

import Cell from '../Cell/Cell';

import useTypedSelector from '../../../shared/hooks/useTypedSelector';
import styles from './Board.module.scss';

const Board: React.FC = () => {
  const board = useTypedSelector((state) => state.settings.board);

  const renderBoard = () =>
    board.map((row, idx) => (
      <ul className={styles.Row} key={idx}>
        {row.map((cell) => (
          <Cell
            key={cell.id}
            className={styles.Cell}
            id={cell.id}
            row={cell.row}
            col={cell.col}
          />
        ))}
      </ul>
    ));

  return <div>{renderBoard()}</div>;
};

export default Board;
