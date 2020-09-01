import React, { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';

import Setting from './components/Setting/Setting';
import Connect from './components/Connect/Connect';
import Spinner from './shared/components/Spinner/Spinner';

import useTypedSelector from './shared/hooks/useTypedSelector';
import { establishConnection } from './store/actions/auth';

function App() {
  const dispatch = useDispatch();
  const { io, player } = useTypedSelector((state) => state.auth);

  useEffect(() => {
    dispatch(establishConnection());
  }, [dispatch]);

  const renderContent = useMemo(() => {
    switch (true) {
      case io && !player:
        return <Connect />;

      case io && !!player:
        return <Setting />;

      default:
        return <Spinner />;
    }
  }, [io, player]);

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
