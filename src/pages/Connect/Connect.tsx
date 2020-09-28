import React, { useEffect, useState, FormEvent, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import Modal from '../../shared/components/Modal/Modal';
import Card from '../../shared/components/Card/Card';

import useSocket from '../../shared/hooks/useSocket';
import { connectPlayer } from '../../store/actions/connect';
import { Player } from '../../models/Player';
import styles from './Connect.module.scss';

type Response = {
  message?: string;
  player?: Player;
};

const Connect: React.FC = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState<string>('');
  const { data, emitter, unlocker, error, acceptError } = useSocket<Response>(
    'connect-player',
  );

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    //TODO Basic Validation
    if (name.length >= 1 && name.length <= 15) {
      emitter(name);
    }
  };

  useEffect(() => {
    if (data.player) {
      dispatch(connectPlayer(data.player));
    } else {
      unlocker();
    }
  }, [data, dispatch, unlocker]);

  // ! FIXME TO REMOVE
  // **************************************************
  useEffect(() => {
    emitter(
      `USER ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
    );
  }, [emitter]);
  // **************************************************

  const renderErrorModal = useMemo(() => {
    if (error) {
      return (
        <Modal onClose={acceptError} onCloseText='Retry'>
          {error}
        </Modal>
      );
    } else {
      return null;
    }
  }, [error, acceptError]);

  return (
    <>
      {renderErrorModal}
      <Card center className={styles.connect}>
        <form onSubmit={submitHandler}>
          <label htmlFor='username'>Type your name: </label>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type='text'
            id='username'
          />
          <button>Connect</button>
        </form>
      </Card>
    </>
  );
};

export default Connect;
