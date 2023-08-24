import Layout from 'components/Layout';
import React from 'react';
import { Stage, useStageStore } from 'stores/useStageStore';
import GamePage from './game/GamePage';
import HomePage from './home/HomePage';
import LobbyPage from './lobby/LobbyPage';

export default function StageRouter() {
  const { stage } = useStageStore();

  const renderStage = () => {
    switch (stage) {
      case Stage.LOBBY: {
        return <LobbyPage />;
      }
      case Stage.GAME: {
        return <GamePage />;
      }
      default: {
        return <HomePage />;
      }
    }
  };

  return <Layout>{renderStage()}</Layout>;
}
