import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Modal from 'shared/components/Modal/Modal';
import { settingStage } from 'store/actions/stages';
import { setTurnId, turnChange } from 'store/actions/game';
import useSocket from 'shared/hooks/useSocket';

const Turn: React.FC = () => {
  const [error, setError] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { data } = useSocket<{
    message: string;
    turnId?: number;
    turn?: number;
    error?: boolean;
  }>('turn-controller');

  useEffect(() => {
    if (data.turnId) {
      dispatch(setTurnId(data.turnId));
    }

    if (data.turn) {
      dispatch(turnChange(data.turn));
    }

    if (data.error) {
      setError(true);
    }
  }, [data, dispatch]);

  const onProceed = () => {
    dispatch(settingStage());
  };

  const errorModal = () => {
    if (error) {
      return (
        <Modal onProceed={onProceed} onProceedText='Back to settings'>
          {'An unexpected error occurred.'}
        </Modal>
      );
    } else {
      return null;
    }
  };

  return <>{errorModal()}</>;
};

export default Turn;
