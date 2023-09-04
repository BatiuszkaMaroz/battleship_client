import { Box } from '@mui/material';
import React from 'react';

import { BOARD_COLS, BOARD_ROWS } from 'config/constants';

type GameUserBoardProps = {
  cellPxSize: number;
};

export default function GameUserBoard({ cellPxSize }: GameUserBoardProps) {
  const boardContainerStyle = {
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: `repeat(${BOARD_COLS}, ${cellPxSize}px)`,
    gridTemplateRows: `repeat(${BOARD_ROWS}, ${cellPxSize}px)`,
    gap: '1px',
    padding: '5px',
    backgroundColor: '#f0f0f0',
  };

  const cellStyle = {
    width: `${cellPxSize}px`,
    height: `${cellPxSize}px`,
    backgroundColor: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    fontWeight: 'bold',
  };

  const cellIndexes = Array.from(
    { length: BOARD_ROWS * BOARD_COLS },
    (_, i) => i,
  );

  return (
    <Box sx={boardContainerStyle}>
      {cellIndexes.map((index) => (
        <Box //
          key={index}
          data-index={index}
          sx={cellStyle}
        />
      ))}
    </Box>
  );
}
