import { Box } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

type ShipProps = {
  size: number;
  cellSize: number;
  initialPosition?: { x: number; y: number };
};

export default function Ship({
  size,
  cellSize,
  initialPosition = { x: 0, y: 0 },
}: ShipProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [cellId, setCellId] = React.useState<string | null>(null);
  const [shipPicked, setShipPicked] = React.useState(false);
  const [shipPosition, setShipPosition] = React.useState(initialPosition);
  const [clickPosition, setClickPosition] = React.useState({ x: 0, y: 0 });

  const width = size * cellSize + (size - 1);
  const height = cellSize;

  useEffect(() => {
    const cell = document.querySelector(
      `#ship-cell[data-index="${cellId}"]`,
    ) as HTMLDivElement;

    if (cell) {
      setShipPosition({
        x: cell.offsetLeft,
        y: cell.offsetTop,
      });
    }
  }, [cellId]);

  useEffect(() => {
    if (shipPicked) {
      // Prevents the ship from being selected using elementFromPoint(x,y).
      ref.current!.style.pointerEvents = 'none';
    } else {
      ref.current!.style.left = '';
      ref.current!.style.top = '';
      ref.current!.style.pointerEvents = '';
    }
  }, [shipPicked]);

  const pickShip = (e: React.MouseEvent) => {
    setShipPicked(true);
    setClickPosition({
      x: e.clientX - shipPosition.x,
      y: e.clientY - shipPosition.y,
    });
  };

  useEffect(() => {
    const moveShip = (e: MouseEvent) => {
      let left = e.clientX - clickPosition.x;
      let top = e.clientY - clickPosition.y;

      const cell = document
        .elementFromPoint(left + cellSize / 2, top + cellSize / 2)
        ?.closest('#ship-cell') as HTMLDivElement;

      if (cell) {
        left = cell.offsetLeft;
        top = cell.offsetTop;
      }

      ref.current!.style.left = left + 'px';
      ref.current!.style.top = top + 'px';
    };

    const dropShip = (e: MouseEvent) => {
      const left = e.clientX - clickPosition.x;
      const top = e.clientY - clickPosition.y;

      const cell = document
        .elementFromPoint(left + cellSize / 2, top + cellSize / 2)
        ?.closest('#ship-cell') as HTMLDivElement;

      if (cell) {
        setCellId(cell.dataset.index as string);
      }

      setShipPicked(false);
    };

    if (shipPicked) {
      document.addEventListener('mousemove', moveShip);
      document.addEventListener('mouseup', dropShip);
    }

    return () => {
      document.removeEventListener('mousemove', moveShip);
      document.removeEventListener('mouseup', dropShip);
    };
  }, [cellSize, clickPosition.x, clickPosition.y, shipPicked]);

  return createPortal(
    <Box
      onMouseDown={pickShip}
      ref={ref}
      sx={{
        position: 'absolute',
        top: shipPosition.y,
        left: shipPosition.x,
        background: 'lightblue',
        width,
        height,
        cursor: 'grab',
        transition: 'all 0.05s ease-in-out',
      }}
    />,
    document.getElementById('ship-root') as HTMLElement,
  );
}
