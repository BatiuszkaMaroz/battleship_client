import React from 'react';

import { STATUS } from '../../store/reducers/status';
import useTypedSelector from '../../shared/hooks/useTypedSelector';

import Card from '../../shared/components/Card/Card';
import Matchmaking from './Matchmaking/Matchmaking';
import Turn from './Turn/Turn';

const Game: React.FC = () => {
  const status = useTypedSelector((state) => state.status);

  const renderContent = () => {
    if (status === STATUS.GAME_STAGE) {
      return <Card center>PLAY A GAME BICZ!</Card>;
    } else {
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
