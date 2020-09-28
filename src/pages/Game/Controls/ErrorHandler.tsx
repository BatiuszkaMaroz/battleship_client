import React from 'react';
import { useDispatch } from 'react-redux';

import Modal from 'shared/components/Modal/Modal';
import { settingStage } from 'store/actions/stages';
import useSocket from 'shared/hooks/useSocket';

const Turn: React.FC = () => {
  const dispatch = useDispatch();
  const { error } = useSocket<{}>('');

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
