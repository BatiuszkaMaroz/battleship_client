import LoopIcon from '@mui/icons-material/Loop';
import { Box, IconButton, useTheme } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import {
  getCellCoordsFromRowCol,
  getRowColFromCellElement,
} from '../services/functions';
import { Ship } from '../services/types';
import { useShipStore } from '../services/useShipStore';

const shadowHorizontal =
  '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)';
const shadowVertical =
  '3px 0px 1px -2px rgba(0,0,0,0.2), 2px 0px 2px 0px rgba(0,0,0,0.14), 1px 0px 5px 0px rgba(0,0,0,0.12)';

type ShipProps = {
  ship: Ship;
  cellPxSize: number;
};

export default function ShipComponent({ ship, cellPxSize }: ShipProps) {
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
  const [shipPosition, setShipPosition] = React.useState<{
    left: number;
    top: number;
  } | null>(null);
  const [clickOffset, setClickOffset] = React.useState({ x: 0, y: 0 });
  const [canRotate, setCanRotate] = React.useState(false);

  // handle cellIndex change
  useEffect(() => {
    const coords = getCellCoordsFromRowCol(ship.row, ship.col);
    setShipPosition(coords);
  }, [ship.col, ship.row]);

  // handle rotation validation, watches for changes in ships array
  useEffect(() => {
    setCanRotate(validateShipRotation(ship.id));
  }, [ships, ship.id, validateShipRotation]);

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
      x: e.clientX - shipPosition!.left,
      y: e.clientY - shipPosition!.top,
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
        .elementFromPoint(left + cellPxSize / 2, top + cellPxSize / 2)
        ?.closest('#setting-cell') as HTMLDivElement;

      if (cell) {
        const { row, col } = getRowColFromCellElement(cell);
        if (validateShipPlacement(ship.id, row, col)) {
          left = cell.offsetLeft;
          top = cell.offsetTop;
        }
      }

      ref.current!.style.left = left + 'px';
      ref.current!.style.top = top + 'px';
    };

    const dropShipHandler = (e: MouseEvent) => {
      const left = e.clientX - clickOffset.x;
      const top = e.clientY - clickOffset.y;

      const cell = document
        .elementFromPoint(left + cellPxSize / 2, top + cellPxSize / 2)
        ?.closest('#setting-cell') as HTMLDivElement;

      if (cell) {
        const { row, col } = getRowColFromCellElement(cell);
        if (validateShipPlacement(ship.id, row, col)) {
          placeShip(ship.id, row, col);
        }
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
    cellPxSize,
    clickOffset.x,
    clickOffset.y,
    placeShip,
    ship.id,
    shipPicked,
    validateShipPlacement,
  ]);

  // handle resizing window
  useEffect(() => {
    const windowResizeHandler = () => {
      const coords = getCellCoordsFromRowCol(ship.row, ship.col);
      setShipPosition(coords);
    };

    window.addEventListener('resize', windowResizeHandler);

    return () => {
      window.removeEventListener('resize', windowResizeHandler);
    };
  }, [ship.col, ship.row]);

  return createPortal(
    <Box
      onMouseDown={pickShipHandler}
      ref={ref}
      sx={{
        display: shipPosition ? 'flex' : 'none',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: shipPosition?.left,
        top: shipPosition?.top,
        width: ship.size * cellPxSize + (ship.size - 1),
        height: cellPxSize,
        backgroundColor: palette.primary.light,
        boxShadow: ship.orientation === 'h' ? shadowHorizontal : shadowVertical,
        cursor: 'grab',
        transform: ship.orientation === 'h' ? 'none' : 'rotate(90deg)',
        transformOrigin: cellPxSize / 2 + 'px ' + cellPxSize / 2 + 'px',
        transitionProperty:
          'left, top, transform, box-shadow, background-color',
        transitionDuration: '0.3s',
        transitionTimingFunction: 'ease-in-out',
      }}
    >
      <IconButton
        sx={{
          opacity: !shipPicked && canRotate ? 1 : 0,
          pointerEvents: !shipPicked && canRotate ? 'all' : 'none',
          transition: 'opacity 0.1s ease-in-out',
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
