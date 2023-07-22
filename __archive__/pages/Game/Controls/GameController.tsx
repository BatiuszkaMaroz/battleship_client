import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPlayerBoard, setEnemyBoard } from 'store/actions/game';
import { EnemyBoard, PlayerBoard } from 'models/Board';
import useSocket from 'shared/hooks/useSocket';
import Modal from 'shared/components/Modal/Modal';
import useTypedSelector from 'shared/hooks/useTypedSelector';
import { settingStage } from 'store/actions/stages';

const Hits: React.FC = () => {
  const dispatch = useDispatch();
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [result, setResult] = useState<boolean>(false);
  const name = useTypedSelector((state) => state.connect.player?.name);

  const { data } = useSocket<{
    enemyBoard?: EnemyBoard;
    playerBoard?: PlayerBoard;
    gameOver?: { win: boolean };
  }>('game-controller');

  useEffect(() => {
    if (data.enemyBoard) {
      dispatch(setEnemyBoard(data.enemyBoard));
    }

    if (data.playerBoard) {
      dispatch(setPlayerBoard(data.playerBoard));
    }

    if (data.gameOver) {
      setGameOver(true);
      setResult(data.gameOver.win);
    }
  }, [dispatch, data]);

  const onProceed = () => {
    dispatch(settingStage());
  };

  const renderGameOverModal = () => {
    if (gameOver) {
      return (
        <Modal
          onProceed={onProceed}
          onProceedText='Back to settings'
        >{`Congratulations ${name}, you have ${
          result ? 'won' : 'lose'
        }!`}</Modal>
      );
    } else {
      return null;
    }
  };

  return <>{renderGameOverModal()}</>;
};

export default Hits;
