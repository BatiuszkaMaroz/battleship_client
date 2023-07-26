import { Box } from '@mui/material';
import { BOARD_SIZE } from 'config/constants';
import React from 'react';

type ShipProps = {
  cellPxSize: number;
};

const Board = ({ cellPxSize }: ShipProps) => {
  const boardContainerStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${BOARD_SIZE}, ${cellPxSize}px)`,
    gridTemplateRows: `repeat(${BOARD_SIZE}, ${cellPxSize}px)`,
    gap: '1px',
    padding: '5px',
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
    { length: BOARD_SIZE * BOARD_SIZE },
    (_, i) => i,
  );

  return (
    <Box style={boardContainerStyle}>
      {cellIndexes.map((index) => (
        <Box //
          key={index}
          id='cell'
          data-index={index}
          sx={cellStyle}
        />
      ))}
    </Box>
  );
};

export default Board;
