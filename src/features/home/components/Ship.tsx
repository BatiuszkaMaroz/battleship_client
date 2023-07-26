import LoopIcon from '@mui/icons-material/Loop';
import { Box, IconButton, useTheme } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import { getCellCoords, getCellIndex } from '../utils/helpers';
import { Coords, Ship } from '../utils/types';
import { useShipStore } from '../utils/useShipStore';

type ShipProps = {
  ship: Ship;
  cellSize: number;
};

const shadowHorizontal =
  '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)';
const shadowVertical =
  '3px 0px 1px -2px rgba(0,0,0,0.2), 2px 0px 2px 0px rgba(0,0,0,0.14), 1px 0px 5px 0px rgba(0,0,0,0.12)';

export default function ShipComponent({ ship, cellSize }: ShipProps) {
  const {
    ships,
    placeShip,
    rotateShip,
    validateShipPlacement,
    validateShipRotation,
  } = useShipStore();
  const { palette } = useTheme();

  const ref = useRef<HTMLDivElement>(null);
  const [shipPicked, setShipPicked] = React.useState(false);
  const [shipPosition, setShipPosition] = React.useState<Coords | null>(null);
  const [clickOffset, setClickOffset] = React.useState({ x: 0, y: 0 });
  const [canRotate, setCanRotate] = React.useState(false);

  // handle cellIndex change
  useEffect(() => {
    const coords = getCellCoords(ship.cellIndex);
    setShipPosition(coords);
  }, [ship.cellIndex]);

  // handle rotation validation, watches for changes in ships array
  useEffect(() => {
    setCanRotate(validateShipRotation(ship.id));
  }, [ships, ship.cellIndex, ship.id, validateShipRotation]);

  // handle styling when ship picked
  useEffect(() => {
    if (shipPicked) {
      ref.current!.style.zIndex = '100';
      ref.current!.style.transitionDuration = '0.025s';
      ref.current!.style.pointerEvents = 'none';

      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'grabbing';
    } else {
      ref.current!.style.zIndex = '';
      ref.current!.style.left = '';
      ref.current!.style.top = '';
      ref.current!.style.transitionDuration = '';
      ref.current!.style.pointerEvents = '';

      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    }
  }, [palette.primary.main, shipPicked]);

  const pickShipHandler = (e: React.MouseEvent) => {
    setShipPicked(true);
    setClickOffset({
      x: e.clientX - shipPosition!.x,
      y: e.clientY - shipPosition!.y,
    });
  };

  const rotateShipHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (validateShipRotation(ship.id)) rotateShip(ship.id);
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
        display: shipPosition ? 'flex' : 'none',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: shipPosition?.x,
        top: shipPosition?.y,
        width: ship.size * cellSize + (ship.size - 1),
        height: cellSize,
        backgroundColor: palette.primary.light,
        boxShadow: ship.orientation === 'h' ? shadowHorizontal : shadowVertical,
        cursor: 'grab',
        transitionProperty:
          'left, top, transform, box-shadow, background-color',
        transitionDuration: '0.3s',
        transitionTimingFunction: 'ease-in-out',
        transform: ship.orientation === 'h' ? 'none' : 'rotate(90deg)',
        transformOrigin: cellSize / 2 + 'px ' + cellSize / 2 + 'px',
      }}
    >
      <IconButton
        sx={{
          opacity: !shipPicked && canRotate ? 1 : 0,
          transition: 'opacity 0.1s ease-in-out',
          pointerEvents: !shipPicked && canRotate ? 'all' : 'none',
        }}
        size='small'
        onMouseDown={rotateShipHandler}
      >
        <LoopIcon />
      </IconButton>
    </Box>,
    document.getElementById('ship-root') as HTMLElement,
  );
}
