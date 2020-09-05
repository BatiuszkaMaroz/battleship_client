import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Spinner from '../../shared/components/Spinner/Spinner';
import useSocket from '../../shared/hooks/useSocket';
import {
  settingStage,
  gameStage,
  matchmakingStage,
} from '../../store/actions/status';
import { unsetGameBoard } from '../../store/actions/game';

const Matchmaking: React.FC = () => {
  const dispatch = useDispatch();
  const { emitter, data, error } = useSocket<{
    message?: string;
    readyToPlay?: boolean;
    playerLeft?: boolean;
  }>('matchmaking');

  useEffect(() => {
    console.log(data);
    if (data.message) {
      console.log(data.message);
    }

    if (data.readyToPlay) {
      dispatch(gameStage());
    }

    if (data.playerLeft) {
      dispatch(matchmakingStage());
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (error) {
      console.error(error);
      dispatch(settingStage());
      dispatch(unsetGameBoard());
    }
  }, [error, dispatch]);

  useEffect(() => {
    emitter();
  }, [emitter]);

  return <>{data.readyToPlay ? null : <Spinner />}</>;
};

export default Matchmaking;
