import React, { useEffect, useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';

import Modal from '../../../shared/components/Modal/Modal';
import Card from '../../../shared/components/Card/Card';

import useSocket from '../../../shared/hooks/useSocket';
import { connectPlayer } from '../../../store/actions/auth';
import styles from './Connect.module.scss';

interface IResponse {
  message?: string;
  player?: object;
}

const Connect: React.FC = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState<string>('');
  const { data, emitter, unlocker, error, acceptError } = useSocket<IResponse>(
    'connect-player',
  );

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (name.length >= 1 && name.length <= 15) {
      emitter(name);
    }
  };

  useEffect(() => {
    if (data.player) {
      console.log(data.message);
      dispatch(connectPlayer(data.player));
    } else {
      unlocker();
    }
  }, [data, dispatch, unlocker]);

  return (
    <>
      {error && <Modal onClick={acceptError}>{error}</Modal>}
      <Card center className={styles.Connect}>
        <form onSubmit={submitHandler}>
          <label htmlFor='room'>Type the your name: </label>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type='text'
            id='room'
          />
          <button>Connect</button>
        </form>
      </Card>
    </>
  );
};

export default Connect;
