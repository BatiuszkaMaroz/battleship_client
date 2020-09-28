import React from 'react';
import styles from '../../Game.module.scss';

type Props = {
  hit: boolean;
  shipId?: string;
  className: string;
};

const Cell: React.FC<Props> = ({ hit, shipId, className }) => {
  const classes = `
  ${styles.playerCell}
  ${className}
  ${shipId ? styles.ship : null}
  ${hit ? styles.hitted : null}
  `;

  return <div className={classes}></div>;
};

export default Cell;
