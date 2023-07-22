import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Modal from 'shared/components/Modal/Modal';
import Spinner from 'shared/components/Spinner/Spinner';
import useSocket from 'shared/hooks/useSocket';
import { gameStage, settingStage } from 'store/actions/stages';

const RandomMatchmaking: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('RERENDER');
  });

  const { emitter, data, error, unlocker, acceptError } = useSocket<{
    message?: string;
    readyToPlay?: boolean;
  }>('matchmaking');

  useEffect(() => {
    if (data.readyToPlay) {
      dispatch(gameStage());
    }
  }, [data, dispatch]);

  useEffect(() => {
    emitter();
  }, []);

  const onProceed = () => {
    acceptError();
    unlocker();
    emitter();
  };

  const onReject = () => {
    dispatch(settingStage());
  };

  const errorModal = () => {
    if (error) {
      return (
        <Modal
          onProceed={onProceed}
          onProceedText='Retry'
          onReject={onReject}
          onRejectText='Back to settings'
        >
          {error ? error : 'Matchmaking error.'}
        </Modal>
      );
    } else {
      return null;
    }
  };

  return (
    <>
      {data.readyToPlay ? null : <Spinner />}
      {errorModal()}
    </>
  );
};

export default RandomMatchmaking;
