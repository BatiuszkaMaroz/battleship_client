import React from 'react';
import styles from './Cell.module.scss';

interface Props {
  id: string;
  row: number;
  col: number;
  className: string;
}

const Cell: React.FC<Props> = ({ id, row, col, className = '' }) => {
  return (
    <div
      data-col={col}
      data-row={row}
      id={id}
      className={`${styles.Cell} ${className} cell`}
    >
      {id}
    </div>
  );
};

export default Cell;
