import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import Spinner from 'shared/components/Spinner/Spinner';
import Modal from 'shared/components/Modal/Modal';
import useSocket from 'shared/hooks/useSocket';
import { GameBoard } from 'models/Board';
import {
  settingStage,
  matchmakingStage,
  gameStage,
} from 'store/actions/stages';
import { setPlayerBoard } from 'store/actions/game';

const Matchmaking: React.FC = () => {
  const [boardDefault, setBoardDefault] = useState<GameBoard | null>(null);
  const dispatch = useDispatch();
  const [userDisconnected, setUserDisconnected] = useState<boolean>(false);

  const { emitter, data, error, unlocker, acceptError } = useSocket<{
    message?: string;
    readyToPlay?: boolean;
    playerLeft?: boolean;
    board?: GameBoard;
  }>('matchmaking');

  useEffect(() => {
    if (data.readyToPlay) {
      dispatch(gameStage());
    }

    if (data.playerLeft) {
      setUserDisconnected(true);
    }

    if (data.board) {
      setBoardDefault(data.board);
    }
  }, [data, dispatch]);

  useEffect(() => {
    emitter();
  }, [emitter, unlocker]);

  const onProceed = () => {
    acceptError();
    unlocker();
    emitter();
    dispatch(setPlayerBoard(boardDefault!, false));
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
