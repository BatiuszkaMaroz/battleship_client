import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Modal from '../../shared/components/Modal/Modal';
import Button from '../../shared/components/Button/Button';
import Card from '../../shared/components/Card/Card';
import Board from './Board/Board';
import Harbor from './Harbor/Harbor';

import useSocket from '../../shared/hooks/useSocket';
import useTypedSelector from '../../shared/hooks/useTypedSelector';
import styles from './Setting.module.scss';
import { resetBoard, randomizeBoard } from '../../store/actions/setting';

const Setting: React.FC = () => {
  const dispatch = useDispatch();
  const { emitter, data, unlocker, acceptError, error } = useSocket(
    'apply-setting',
  );

  const board = useTypedSelector((state) => state.board);
  const allShipsSettled = useTypedSelector((state) =>
    state.ships.reduce((prev, cur) => {
      if (prev) {
        if (cur && cur.settled) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }, true),
  );

  const applySetting = useCallback(() => {
    if (allShipsSettled) {
      emitter(board);
      unlocker();
    }
  }, [allShipsSettled, board, emitter, unlocker]);

  const resetSetting = useCallback(() => {
    dispatch(resetBoard());
  }, [dispatch]);

  const randomizeSetting = useCallback(() => {
    dispatch(randomizeBoard());
  }, [dispatch]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      {error && <Modal onClick={acceptError}>{error}</Modal>}
      <Card center className={styles.Setting}>
        <div className={styles.Setting__Container}>
          <Harbor />
          <Board />
        </div>
        <div className={styles.Setting__Controls}>
          <Button disabled={!allShipsSettled} onClick={applySetting}>
            Play
          </Button>
          <Button onClick={resetSetting}>Reset</Button>
          <Button onClick={randomizeSetting}>Randomize</Button>
        </div>
      </Card>
    </>
  );
};

export default Setting;
