import React from 'react';
import styles from '../../Game.module.scss';

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
  const clickHandler = () => {
    if (hit) return;
    onShot(row, col);
  };

  const classes = `
  ${styles.enemyCell}
  ${className}
  ${hit ? styles.hitted : null}
  ${ship ? styles.shipHitted : null}
  `;

  return <div onClick={clickHandler} className={classes}></div>;
};

export default EnemyCell;
