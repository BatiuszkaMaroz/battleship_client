import React from 'react';

import { STAGE } from '../../store/reducers/stages';
import useTypedSelector from '../../shared/hooks/useTypedSelector';

import Card from '../../shared/components/Card/Card';
import Matchmaking from './Matchmaking/Matchmaking';
import Turn from './Turn/Turn';

const Game: React.FC = () => {
  const stage = useTypedSelector((state) => state.stage);

  const renderContent = () => {
    if (stage === STAGE.GAME_STAGE) {
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
