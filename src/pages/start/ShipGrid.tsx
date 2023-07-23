import { Box } from '@mui/material';
import React from 'react';

type GridProps = {
  gridSize: number;
  cellSize: number;
};

const ShipGrid = ({ cellSize, gridSize }: GridProps) => {
  const gridContainerStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${gridSize}, ${cellSize}px)`,
    gridTemplateRows: `repeat(${gridSize}, ${cellSize}px)`,
    gap: '1px',
    padding: '5px',
  };

  const cellStyle = {
    width: `${cellSize}px`,
    height: `${cellSize}px`,
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
        <Box key={index} id='ship-cell' sx={cellStyle} data-index={index} />
      ))}
    </Box>
  );
};

export default ShipGrid;