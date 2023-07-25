import { Box } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import { getCellCoords, getCellIndex } from './helpers';
import { Coords } from './types';
import { useShipStore } from './useShipStore';

type ShipProps = {
  shipId: string;
  shipSize: number;
  shipCellIndex: number;
  cellSize: number;
};

export default function Ship({
  shipId,
  shipSize,
  shipCellIndex,
  cellSize,
}: ShipProps) {
  const { setShipCellIndex, canShipBePlaced } = useShipStore();

  const ref = useRef<HTMLDivElement>(null);
  const [shipPicked, setShipPicked] = React.useState(false);
  const [shipPosition, setShipPosition] = React.useState<Coords | null>(null);
  const [clickOffset, setClickOffset] = React.useState({ x: 0, y: 0 });

  // handle cellIndex change
  useEffect(() => {
    const coords = getCellCoords(shipCellIndex);
    setShipPosition(coords);
  }, [shipCellIndex]);

  // handle styling when ship picked
  useEffect(() => {
    if (shipPicked) {
      ref.current!.style.pointerEvents = 'none';
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'grabbing';
    } else {
      ref.current!.style.pointerEvents = '';
      ref.current!.style.left = '';
      ref.current!.style.top = '';
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

      if (cell && canShipBePlaced(shipId, getCellIndex(cell))) {
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

      if (cell && canShipBePlaced(shipId, getCellIndex(cell))) {
        setShipCellIndex(shipId, +(cell.dataset.index as string));
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
    canShipBePlaced,
    cellSize,
    clickOffset.x,
    clickOffset.y,
    setShipCellIndex,
    shipId,
    shipPicked,
  ]);

  return createPortal(
    <Box
      onMouseDown={pickShipHandler}
      ref={ref}
      sx={{
        display: shipPosition ? null : 'none',
        position: 'absolute',
        left: shipPosition?.x || 0,
        top: shipPosition?.y || 0,
        width: shipSize * cellSize + (shipSize - 1),
        height: cellSize,
        background: 'lightblue',
        cursor: 'grab',
        transition: shipPosition ? 'all 0.05s ease-in-out' : null,
      }}
    />,
    document.getElementById('ship-root') as HTMLElement,
  );
}
