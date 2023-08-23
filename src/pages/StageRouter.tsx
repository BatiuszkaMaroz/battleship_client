import React from 'react';
import { Stage, useStageStore } from 'stores/useStageStore';
import HomePage from './home/HomePage';
import MatchmakingPage from './matchmaking/MatchmakingPage';

export default function StageRouter() {
  const { stage } = useStageStore();

  switch (stage) {
    case Stage.MATCHMAKING: {
      return <MatchmakingPage />;
    }
    case Stage.GAME: {
      return <div>PLAYING</div>;
    }
    default: {
      return <HomePage />;
    }
  }
}
