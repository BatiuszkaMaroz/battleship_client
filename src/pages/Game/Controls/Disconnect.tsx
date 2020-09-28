import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import Modal from 'shared/components/Modal/Modal';
import useSocket from 'shared/hooks/useSocket';
import { GameBoard } from 'models/Board';
import { settingStage, matchmakingStage } from 'store/actions/stages';
import { setPlayerBoard } from 'store/actions/game';

const Disconnect: React.FC = () => {
  const dispatch = useDispatch();
  const [boardDefault, setBoardDefault] = useState<GameBoard | null>(null);
  const [userDisconnected, setUserDisconnected] = useState<boolean>(false);

  const { data } = useSocket<{
    message?: string;
    playerLeft?: boolean;
    board?: GameBoard;
  }>('disconnect');

  useEffect(() => {
    if (data.playerLeft) {
      setUserDisconnected(true);
    }

    if (data.board) {
      setBoardDefault(data.board);
    }
  }, [data, dispatch]);

  const onProceed = () => {
    if (!boardDefault) {
      return dispatch(settingStage());
    }

    dispatch(setPlayerBoard(boardDefault, false));
    dispatch(matchmakingStage());
  };

  const onReject = () => {
    dispatch(settingStage());
  };

  const disconnectionModal = () => {
    if (userDisconnected) {
      return (
        <Modal
          onProceed={onProceed}
          onProceedText='Reconnect'
          onReject={onReject}
          onRejectText='Back to settings'
        >
          {'Player left the game.'}
        </Modal>
      );
    } else {
      return null;
    }
  };

  return <>{disconnectionModal()}</>;
};

export default Disconnect;
