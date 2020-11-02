import React from 'react';
import styles from '../../Game.module.scss';

type Props = {
  col: number;
  row: number;
  hit: boolean;
  shipId: boolean;
  onShot: (row: number, col: number) => void;
  className?: string;
};

const EnemyCell: React.FC<Props> = ({
  col,
  row,
  hit,
  shipId,
  onShot,
  className,
}) => {
  const clickHandler = () => {
    if (hit) return;
    onShot(row, col);
  };

  const classes = `
  ${styles.enemyCell}
  ${className}
  ${hit ? styles.hitted : null}
  ${shipId ? styles.ship : null}
  `;

  return <div onClick={clickHandler} className={classes}></div>;
};

export default EnemyCell;
