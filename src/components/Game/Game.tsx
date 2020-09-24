import React from 'react';

import { STAGES } from '../../store/reducers/stages';
import useTypedSelector from '../../shared/hooks/useTypedSelector';

import Card from '../../shared/components/Card/Card';
import PlayerBoard from './PlayerBoard/PlayerBoard';
import EnemyBoard from './EnemyBoard/EnemyBoard';
import Matchmaking from './Controls/Matchmaking/Matchmaking';
import Turn from './Controls/Turn/Turn';

import styles from './Game.module.scss';

const Game: React.FC = () => {
  const stage = useTypedSelector((state) => state.stage);

  const renderContent = () => {
    switch (stage) {
      case STAGES.GAME:
        return (
          <Card center className={styles.Game}>
            <PlayerBoard />
            <EnemyBoard />
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Turn />
      <Matchmaking />
      {renderContent()}
    </>
  );
};

export default Game;
