import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Spinner from '../../../shared/components/Spinner/Spinner';
import Modal from '../../../shared/components/Modal/Modal';

import { joinRoom } from '../../../store/actions/auth';
import useSocket from '../../../shared/hooks/useSocket';
import styles from './Join.module.scss';

interface IResponse {
  message?: string;
  player?: object;
}

const Join: React.FC = () => {
  const dispatch = useDispatch();
  const { data, emitter, unlocker, error, acceptError } = useSocket<IResponse>(
    'join-room',
  );

  const clickHandler = () => {
    emitter();
  };

  useEffect(() => {
    if (data.player) {
      console.log(data.message);
      dispatch(joinRoom(data.player));
    } else {
      unlocker();
    }
  }, [data, dispatch, unlocker]);

  return (
    <>
      {error && <Modal onClick={acceptError}>{error}</Modal>}
      <Spinner />
    </>
  );
};

export default Join;
