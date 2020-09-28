import React, { useEffect } from 'react';

import EnemyCell from './EnemyCell/EnemyCell';
import useTypedSelector from 'shared/hooks/useTypedSelector';
import useSocket from 'shared/hooks/useSocket';
import styles from '../Game.module.scss';
import { useDispatch } from 'react-redux';

const EnemyBoard: React.FC = () => {
  const dispatch = useDispatch();
  const board = useTypedSelector((state) => state.game.enemyBoard);
  const yourTurn = useTypedSelector((state) => state.game.turn.yourTurn);

  const { emitter, data, unlocker } = useSocket<{
    unlock?: boolean;
  }>('game-controller');

  const onShot = (row: number, col: number) => {
    if (!yourTurn) return;

    emitter({ row, col });
  };

  useEffect(() => {
    if (data.unlock) {
      unlocker();
    }
  }, [data, unlocker, dispatch]);

  const renderBoard = () =>
    board.map((row, idx) => (
      <ul className={styles.row} key={idx}>
        {row.map((cell) => (
          <EnemyCell
            key={cell.id}
            col={cell.col}
            row={cell.row}
            hit={cell.hit}
            ship={cell.ship}
            onShot={onShot}
            className={styles.cell}
          />
        ))}
      </ul>
    ));

  return <div>{renderBoard()}</div>;
};

export default EnemyBoard;
