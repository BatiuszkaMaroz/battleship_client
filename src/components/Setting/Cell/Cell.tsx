import React, { useEffect, useRef } from 'react';
import styles from './Cell.module.scss';

interface Props {
  id: string;
  row: number;
  col: number;
  className: string;
}

const Cell: React.FC<Props> = ({ id, row, col, className = '' }) => {
  // const cellRef = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   if (cellRef.current) {
  //     const delay = (+id.slice(0, 1) + +id.slice(1, 2)) * 50;
  //     cellRef.current.style.animationDelay = `${delay}ms`;
  //     cellRef.current.classList.add(styles.Animated);

  //     setTimeout(() => {
  //       cellRef.current!.classList.remove(styles.Animated);
  //     }, delay + 1000);
  //   }
  // }, [id]);

  return (
    <div
      // ref={cellRef}
      id={`cell-${id}`}
      data-col={col}
      data-row={row}
      className={`${styles.Cell} ${className} cell`}
    >
      {id}
    </div>
  );
};

export default Cell;
