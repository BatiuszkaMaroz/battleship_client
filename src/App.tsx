import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';

import Game from './components/Game/Game';
import Connect from './components/Auth/Connect/Connect';
import Join from './components/Auth/Join/Join';
import Spinner from './shared/components/Spinner/Spinner';

import useTypedSelector from './shared/hooks/useTypedSelector';
import { establishConnection } from './store/actions/auth';

function App() {
  const dispatch = useDispatch();
  const { io, player } = useTypedSelector((state) => state.auth);

  useEffect(() => {
    dispatch(establishConnection());
  }, [dispatch]);

  let routes: React.ReactNode | null = null;

  if (!io) {
    routes = (
      <>
        <Route path='/' exact>
          <Spinner />
        </Route>
        <Redirect to='/' />
      </>
    );
  }

  if (io && !player) {
    routes = (
      <>
        <Route path='/' exact>
          <Connect />
        </Route>
      </>
    );
  }

  if (player) {
    routes = (
      <>
        <Route path='/' exact>
          <div>HELLO {player?.name}</div>
          <Join />
        </Route>
      </>
    );
  }

  return (
    <div>
      {/* <Switch>{routes}</Switch> */}
      <Game />
    </div>
  );
}

export default App;
