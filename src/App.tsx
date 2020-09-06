import React, { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';

import Setting from './components/Setting/Setting';
import Connect from './components/Connect/Connect';
import Game from './components/Game/Game';
import Spinner from './shared/components/Spinner/Spinner';

import useTypedSelector from './shared/hooks/useTypedSelector';
import { establishConnection } from './store/actions/connect';
import { STAGE } from './store/reducers/stages';

function App() {
  const dispatch = useDispatch();
  const stage = useTypedSelector((state) => state.stage);

  useEffect(() => {
    dispatch(establishConnection());
  }, [dispatch]);

  const renderContent = useMemo(() => {
    switch (stage) {
      case STAGE.CONNECT_STAGE:
        return <Connect />;

      case STAGE.SETTING_STAGE:
        return <Setting />;

      case STAGE.MATCHMAKING_STAGE:
      case STAGE.GAME_STAGE:
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
}

export default App;
