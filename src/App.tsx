import React, { useEffect, useMemo } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Matchmaking from 'pages/Matchmaking/Matchmaking';
import Connect from 'pages/Connect/Connect';
import Setting from 'pages/Setting/Setting';
import Game from 'pages/Game/Game';
import Spinner from 'shared/components/Spinner/Spinner';

import useTypedSelector from 'shared/hooks/useTypedSelector';
import { establishConnection } from 'store/actions/connect';
import { setRoomId } from 'store/actions/game';
import { STAGES } from 'store/reducers/stages';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const stage = useTypedSelector((state) => state.stage);

  const params = useLocation();

  useEffect(() => {
    const roomId = params.pathname.split('/roomId/')[1];
    if (roomId) {
      dispatch(setRoomId(roomId, 'invited'));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(establishConnection());
  }, [dispatch]);

  const renderContent = useMemo(() => {
    switch (stage) {
      case STAGES.CONNECT:
        return <Connect />;

      case STAGES.SETTING:
        return <Setting />;

      case STAGES.MATCHMAKING:
        return <Matchmaking />;

      case STAGES.GAME:
        return <Game />;

      default:
        return <Spinner />;
    }
  }, [stage]);

  return <>{renderContent}</>;
};

export default App;
