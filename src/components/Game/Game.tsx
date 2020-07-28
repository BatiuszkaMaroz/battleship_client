import React from 'react';

import Card from '../../shared/components/Card/Card';
import Board from './Board/Board';
import Harbor from './Harbor/Harbor';

import styles from './Game.module.scss';

const Game: React.FC = () => {
  return (
    <Card center className={styles.Game}>
      <Harbor />
      <Board />
    </Card>
  );
};

export default Game;
