import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPlayerBoard, setEnemyBoard } from 'store/actions/game';
import { EnemyBoard, GameBoard } from 'models/Board';
import useSocket from 'shared/hooks/useSocket';

const Hits: React.FC = () => {
  const dispatch = useDispatch();

  const { data } = useSocket<{
    enemyBoard: EnemyBoard;
    playerBoard: GameBoard;
  }>('game-controller');

  useEffect(() => {
    if (data.enemyBoard) {
      dispatch(setEnemyBoard(data.enemyBoard));
    }

    if (data.playerBoard) {
      dispatch(setPlayerBoard(data.playerBoard));
    }
  }, [dispatch, data]);

  return null;
};

export default Hits;
