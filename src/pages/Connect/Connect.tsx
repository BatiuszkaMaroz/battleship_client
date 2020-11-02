import React, { useEffect, useState, FormEvent, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import Modal from '../../shared/components/Modal/Modal';
import Button from '../../shared/components/Button/Button';

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
  const { data, emitter, error, acceptError } = useSocket<Response>(
    'connect-player',
  );

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    if (name.length >= 3 && name.length <= 15) {
      emitter(name);
    }
  };

  useEffect(() => {
    if (data.player) {
      dispatch(connectPlayer(data.player));
    }
  }, [data, dispatch]);

  //! FIXME AUTO-CONNECT
  //! ************************************************** //
  // useEffect(() => {
  //   emitter(
  //     `USER ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
  //   );
  // }, [emitter]);
  //! ************************************************** //

  const renderErrorModal = useMemo(() => {
    if (error) {
      return (
        <Modal onClose={acceptError} onProceed={() => {}} onProceedText='Retry'>
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
      <section className={styles.connect}>
        <h1>BATTLESHIP</h1>
        <form onSubmit={submitHandler}>
          <label htmlFor='username'>Type your name:</label>
          <input
            // autoComplete='off'
            onChange={(e) => setName(e.target.value)}
            value={name}
            id='username'
            minLength={3}
            maxLength={15}
          />
          <Button>Play</Button>
        </form>
      </section>
    </>
  );
};

export default Connect;
