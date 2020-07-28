import React from 'react';

import Card from '../../../shared/components/Card/Card';
import Cell from '../Cell/Cell';
import Ship from '../Ship/Ship';

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

  return (
    <Card className={styles.Board} center>
      {boardElement()}
      <Ship />
    </Card>
  );
};

export default Board;
