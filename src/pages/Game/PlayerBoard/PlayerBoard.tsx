import React from 'react';

import PlayerCell from './PlayerCell/PlayerCell';
import useTypedSelector from 'shared/hooks/useTypedSelector';
import styles from '../Game.module.scss';

const PlayerBoard: React.FC = () => {
  const board = useTypedSelector((state) => state.game.playerBoard!);

  const renderBoard = () =>
    board.map((row, idx) => (
      <ul className={styles.row} key={idx}>
        {row.map((cell) => (
          <PlayerCell
            key={cell.id}
            hit={cell.hit}
            shipId={cell.shipId || ''}
            className={styles.cell}
          />
        ))}
      </ul>
    ));

  return <div>{renderBoard()}</div>;
};

export default PlayerBoard;
