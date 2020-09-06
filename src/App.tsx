import React, { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';

import Setting from './components/Setting/Setting';
import Connect from './components/Connect/Connect';
import Game from './components/Game/Game';
import Spinner from './shared/components/Spinner/Spinner';

import useTypedSelector from './shared/hooks/useTypedSelector';
import { establishConnection } from './store/actions/connect';
import { STATUS } from './store/reducers/status';

function App() {
  const dispatch = useDispatch();
  const status = useTypedSelector((state) => state.status);

  useEffect(() => {
    dispatch(establishConnection());
  }, [dispatch]);

  const renderContent = useMemo(() => {
    switch (status) {
      case STATUS.CONNECT_STAGE:
        return <Connect />;

      case STATUS.SETTING_STAGE:
        return <Setting />;

      case STATUS.MATCHMAKING_STAGE:
      case STATUS.GAME_STAGE:
        return <Game />;

      default:
        return <Spinner />;
    }
  }, [status]);

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
