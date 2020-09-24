import React from 'react';
import styles from './EnemyCell.module.scss';

type Props = {
  col: number;
  row: number;
  hit: boolean;
  ship: boolean;
  onShot: (row: number, col: number) => void;
  className?: string;
};

const EnemyCell: React.FC<Props> = ({
  col,
  row,
  hit,
  ship,
  onShot,
  className,
}) => {
  const onClickHandler = () => {
    if (hit) return;

    onShot(row, col);
  };

  return (
    <div
      onClick={onClickHandler}
      className={`${styles.EnemyCell} ${className}`}
    ></div>
  );
};

export default EnemyCell;
