import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Button from '../../shared/components/Button/Button';
import Card from '../../shared/components/Card/Card';
import Modal from '../../shared/components/Modal/Modal';
import Board from './Board/Board';
import Harbor from './Harbor/Harbor';
import PrivateRoom from './PrivateRoom/PrivateRoom';

import useSocket from '../../shared/hooks/useSocket';
import useTypedSelector from '../../shared/hooks/useTypedSelector';
import styles from './Setting.module.scss';

import { toggleMode } from 'store/actions/game';
import { setPlayerBoard } from '../../store/actions/game';
import { randomizeBoard, resetBoard } from '../../store/actions/setting';

const Setting: React.FC = () => {
  const dispatch = useDispatch();

  const mode = useTypedSelector((state) => state.game.mode.mode);
  const board = useTypedSelector((state) => state.settings.board);
  const allShipsSettled = useTypedSelector((state) =>
    state.settings.ships.reduce((prev, cur) => {
      if (prev) {
        if (cur?.settled) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }, true),
  );

  const { emitter, data, acceptError, error } = useSocket<{
    validatedBoard: any;
    message: string;
  }>('apply-setting');

  const applySetting = () => {
    if (allShipsSettled) {
      emitter(board);
    }
  };

  const resetSetting = () => {
    dispatch(resetBoard());
  };

  const randomizeSetting = () => {
    dispatch(randomizeBoard());
  };

  useEffect(() => {
    if (data.validatedBoard) {
      dispatch(setPlayerBoard(data.validatedBoard, true));
    }
  }, [dispatch, data]);

  // ! FIXME AUTO SETTING
  //! **************************************************
  // const [ready, setReady] = useState<boolean>(false);
  // useEffect(() => {
  //   dispatch(randomizeBoard());
  //   // setReady(true);
  // }, [dispatch]);
  // // useEffect(() => {
  // //   if (ready) {
  // //     emitter(board);
  // //   }
  // // }, [ready, board, emitter]);
  //! **************************************************

  return (
    <>
      {error && <Modal onClose={acceptError}>{error}</Modal>}
      <Card center className={styles.setting}>
        <div className={styles.setting__container}>
          <Harbor />
          <Board />
        </div>
        <div className={styles.setting__controls}>
          <Button disabled={!allShipsSettled} onClick={applySetting}>
            Play
          </Button>
          {mode !== 'invited' && (
            <Button onClick={() => dispatch(toggleMode())}>Mode: {mode}</Button>
          )}
          <Button onClick={resetSetting}>Reset</Button>
          <Button onClick={randomizeSetting}>Randomize</Button>
        </div>
        {mode === 'private' && <PrivateRoom />}
      </Card>
    </>
  );
};

export default Setting;
