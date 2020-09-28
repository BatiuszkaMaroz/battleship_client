import React, { useEffect, useMemo } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Matchmaking from 'pages/Matchmaking/Matchmaking';
import Connect from 'pages/Connect/Connect';
import Setting from 'pages/Setting/Setting';
import Game from 'pages/Game/Game';
import Spinner from 'shared/components/Spinner/Spinner';

import useTypedSelector from 'shared/hooks/useTypedSelector';
import { establishConnection } from 'store/actions/connect';
import { STAGES } from 'store/reducers/stages';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const stage = useTypedSelector((state) => state.stage);

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

  return (
    <Switch>
      <Route path='/' exact>
        {renderContent}
      </Route>
      <Redirect to='/' />
    </Switch>
  );
};

export default App;
