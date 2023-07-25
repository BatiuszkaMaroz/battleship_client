import { Box } from '@mui/material';
import React from 'react';

type GridProps = {
  gridSize: number;
  cellSizePx: number;
};

const ShipGrid = ({ cellSizePx, gridSize }: GridProps) => {
  const gridContainerStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${gridSize}, ${cellSizePx}px)`,
    gridTemplateRows: `repeat(${gridSize}, ${cellSizePx}px)`,
    gap: '1px',
    padding: '5px',
  };

  const cellStyle = {
    width: `${cellSizePx}px`,
    height: `${cellSizePx}px`,
    backgroundColor: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    fontWeight: 'bold',
  };

  const cellIndexes = Array.from({ length: gridSize * gridSize }, (_, i) => i);

  return (
    <Box style={gridContainerStyle}>
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

export default ShipGrid;
