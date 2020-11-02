import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setTurnId, turnChange } from 'store/actions/game';
import useSocket from 'shared/hooks/useSocket';

const Turn: React.FC = () => {
  const dispatch = useDispatch();
  const { data, emitter } = useSocket<{
    message: string;
    turnId?: number;
    turn?: number;
  }>('turn-controller');

  useEffect(() => {
    if (data.turnId) {
      dispatch(setTurnId(data.turnId));
    }

    if (data.turn) {
      dispatch(turnChange(data.turn));
    }
  }, [data, dispatch]);

  useEffect(() => {
    emitter();
  }, [emitter]);

  return null;
};

export default Turn;
