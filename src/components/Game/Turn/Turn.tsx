import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setTurnId, turnChange } from '../../../store/actions/game';
import useSocket from '../../../shared/hooks/useSocket';

const Turn: React.FC = () => {
  const dispatch = useDispatch();
  const { data } = useSocket<{
    message: string;
    turnId?: number;
    turn?: number;
  }>('turn-controller');

  useEffect(() => {
    if (data.message) {
      console.log(data.message);
    }

    if (data.turnId) {
      dispatch(setTurnId(data.turnId));
    }

    if (data.turn) {
      dispatch(turnChange(data.turn));
    }
  }, [data, dispatch]);

  return null;
};

export default Turn;
