import { Box } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import { getCellCoords, getCellIndex } from '../utils/helpers';
import { Coords, Ship } from '../utils/types';
import { useShipStore } from '../utils/useShipStore';

type ShipProps = {
  ship: Ship;
  cellSize: number;
};

export default function ShipComponent({ ship, cellSize }: ShipProps) {
  const { placeShip, validateShipPlacement } = useShipStore();

  const ref = useRef<HTMLDivElement>(null);
  const [shipPicked, setShipPicked] = React.useState(false);
  const [shipPosition, setShipPosition] = React.useState<Coords | null>(null);
  const [clickOffset, setClickOffset] = React.useState({ x: 0, y: 0 });

  // handle cellIndex change
  useEffect(() => {
    const coords = getCellCoords(ship.cellIndex);
    setShipPosition(coords);
  }, [ship.cellIndex]);

  // handle styling when ship picked
  useEffect(() => {
    if (shipPicked) {
      ref.current!.style.pointerEvents = 'none';
      ref.current!.style.transition =
        'left 0.025s ease-in-out, top 0.05s ease-in-out';
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'grabbing';
    } else {
      ref.current!.style.left = '';
      ref.current!.style.top = '';
      ref.current!.style.pointerEvents = '';
      ref.current!.style.transition = '';
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    }
  }, [shipPicked]);

  const pickShipHandler = (e: React.MouseEvent) => {
    setShipPicked(true);
    setClickOffset({
      x: e.clientX - shipPosition!.x,
      y: e.clientY - shipPosition!.y,
    });
  };

  useEffect(() => {
    const moveShipHandler = (e: MouseEvent) => {
      let left = e.clientX - clickOffset.x;
      let top = e.clientY - clickOffset.y;

      const cell = document
        .elementFromPoint(left + cellSize / 2, top + cellSize / 2)
        ?.closest('#cell') as HTMLDivElement;

      if (cell && validateShipPlacement(ship.id, getCellIndex(cell))) {
        left = cell.offsetLeft;
        top = cell.offsetTop;
      }

      ref.current!.style.left = left + 'px';
      ref.current!.style.top = top + 'px';
    };

    const dropShipHandler = (e: MouseEvent) => {
      const left = e.clientX - clickOffset.x;
      const top = e.clientY - clickOffset.y;

      const cell = document
        .elementFromPoint(left + cellSize / 2, top + cellSize / 2)
        ?.closest('#cell') as HTMLDivElement;

      if (cell && validateShipPlacement(ship.id, getCellIndex(cell))) {
        placeShip(ship.id, +(cell.dataset.index as string));
      }

      setShipPicked(false);
    };

    if (shipPicked) {
      document.addEventListener('mousemove', moveShipHandler);
      document.addEventListener('mouseup', dropShipHandler);
    }

    return () => {
      document.removeEventListener('mousemove', moveShipHandler);
      document.removeEventListener('mouseup', dropShipHandler);
    };
  }, [
    cellSize,
    clickOffset.x,
    clickOffset.y,
    placeShip,
    ship.id,
    shipPicked,
    validateShipPlacement,
  ]);

  return createPortal(
    <Box
      onMouseDown={pickShipHandler}
      ref={ref}
      sx={{
        display: shipPosition ? null : 'none',
        position: 'absolute',
        left: shipPosition?.x ?? 0,
        top: shipPosition?.y ?? 0,
        width: ship.size * cellSize + (ship.size - 1),
        height: cellSize,
        background: 'lightblue',
        cursor: 'grab',
        transition: 'all 0.2s ease-in-out',
        transform: ship.orientation === 'h' ? null : 'rotate(90deg)',
        transformOrigin: cellSize / 2 + 'px ' + cellSize / 2 + 'px',
      }}
    />,
    document.getElementById('ship-root') as HTMLElement,
  );
}
