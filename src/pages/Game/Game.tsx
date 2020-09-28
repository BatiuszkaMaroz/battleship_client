import React from 'react';

import { STAGES } from '../../store/reducers/stages';
import useTypedSelector from '../../shared/hooks/useTypedSelector';

import Card from '../../shared/components/Card/Card';
import PlayerBoard from './PlayerBoard/PlayerBoard';
import EnemyBoard from './EnemyBoard/EnemyBoard';
import Disconnect from './Controls/Disconnect';
import ErrorHandler from './Controls/ErrorHandler';
import GameController from './Controls/GameController';
import TurnController from './Controls/TurnController';

import styles from './Game.module.scss';

const Game: React.FC = () => {
  const stage = useTypedSelector((state) => state.stage);

  const renderContent = () => {
    switch (stage) {
      case STAGES.GAME:
        return (
          <Card center className={styles.game}>
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
      <Disconnect />
      <ErrorHandler />
      <GameController />
      <TurnController />
      {renderContent()}
    </>
  );
};

export default Game;
