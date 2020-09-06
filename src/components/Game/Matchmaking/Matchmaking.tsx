import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import Spinner from '../../../shared/components/Spinner/Spinner';
import Modal from '../../../shared/components/Modal/Modal';
import useSocket from '../../../shared/hooks/useSocket';
import {
  settingStage,
  matchmakingStage,
  gameStage,
} from '../../../store/actions/stages';

const Matchmaking: React.FC = () => {
  const dispatch = useDispatch();
  const [userDisconnected, setUserDisconnected] = useState<boolean>(false);

  const { emitter, data, error, unlocker, acceptError } = useSocket<{
    message?: string;
    readyToPlay?: boolean;
    playerLeft?: boolean;
  }>('matchmaking');

  useEffect(() => {
    if (data.message) {
      console.log(data.message);
    }

    if (data.readyToPlay) {
      dispatch(gameStage());
    }

    if (data.playerLeft) {
      setUserDisconnected(true);
    }
  }, [data, dispatch]);

  useEffect(() => {
    emitter();
  }, [emitter, unlocker]);

  const onProceed = () => {
    acceptError();
    unlocker();
    emitter();
    dispatch(matchmakingStage());
    setUserDisconnected(false);
  };

  const onReject = () => {
    dispatch(settingStage());
  };

  const connectionErrorModal = () => {
    if (userDisconnected || error) {
      return (
        <Modal
          onProceed={onProceed}
          onProceedText='Reconnect'
          onReject={onReject}
          onRejectText='Back to settings'
        >
          {error ? error : 'What would you like to do now?'}
        </Modal>
      );
    } else {
      return null;
    }
  };

  return (
    <>
      {data.readyToPlay ? null : <Spinner />}
      {connectionErrorModal()}
    </>
  );
};

export default Matchmaking;
