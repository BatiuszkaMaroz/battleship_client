import React from 'react';
import useTypedSelector from 'shared/hooks/useTypedSelector';

import PrivateMatchmaking from './Private';
import RandomMatchmaking from './Random';

const MatchmakingRouter: React.FC = () => {
  const { mode } = useTypedSelector((state) => state.game.mode);

  if (mode === 'random') {
    return <RandomMatchmaking />;
  } else {
    return <PrivateMatchmaking />;
  }
};

export default MatchmakingRouter;
