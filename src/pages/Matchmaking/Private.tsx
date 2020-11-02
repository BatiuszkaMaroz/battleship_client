import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useTypedSelector from 'shared/hooks/useTypedSelector';
import useSocket from 'shared/hooks/useSocket';

import { settingStage, gameStage } from 'store/actions/stages';
import { exitInvitedMode } from 'store/actions/game';
import Spinner from 'shared/components/Spinner/Spinner';
import Modal from 'shared/components/Modal/Modal';

const PrivateMatchmaking: React.FC = () => {
  const dispatch = useDispatch();
  const { roomId } = useTypedSelector((state) => state.game.mode);
  const { emitter, data, error } = useSocket<{ readyToPlay: boolean }>(
    'private-matchmaking',
  );

  useEffect(() => {
    emitter(roomId);
  }, [emitter, roomId]);

  const onProceed = () => {
    window.history.pushState({}, '', '/');
    dispatch(exitInvitedMode());
    dispatch(settingStage());
  };

  useEffect(() => {
    if (data.readyToPlay) {
      dispatch(gameStage());
    }
  }, [data, dispatch]);

  return (
    <>
      {error && <Modal onProceed={onProceed}>{error}</Modal>}
      <Spinner />
    </>
  );
};

export default PrivateMatchmaking;
