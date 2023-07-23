import { Box } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function Ship() {
  const ref = useRef<HTMLDivElement>(null);
  const [shipPicked, setShipPicked] = React.useState(false);
  const [shipPosition, setShipPosition] = React.useState({ x: 50, y: 50 });
  const [clickPosition, setClickPosition] = React.useState({ x: 0, y: 0 });

  const width = 200;
  const height = 50;

  const pickUpShip = (e: React.MouseEvent) => {
    setShipPicked(true);
    setClickPosition({
      x: e.clientX - shipPosition.x,
      y: e.clientY - shipPosition.y,
    });
  };

  useEffect(() => {
    const moveShip = (e: MouseEvent) => {
      const left = e.clientX - clickPosition.x;
      const top = e.clientY - clickPosition.y;

      const cell = document
        .elementFromPoint(left + width / 2, top + height / 2)
        ?.closest('#cell') as HTMLDivElement;

      if (cell) {
        console.log('OK');
      }

      ref.current!.style.left = `${left}px`;
      ref.current!.style.top = `${top}px`;
      if (!shipPicked) return;
    };

    const dropShip = (e: MouseEvent) => {
      setShipPicked(false);
      setShipPosition({
        x: e.clientX - clickPosition.x,
        y: e.clientY - clickPosition.y,
      });
    };

    if (shipPicked) {
      document.addEventListener('mousemove', moveShip);
      document.addEventListener('mouseup', dropShip);
    }

    return () => {
      document.removeEventListener('mousemove', moveShip);
      document.removeEventListener('mouseup', dropShip);
    };
  }, [clickPosition.x, clickPosition.y, shipPicked]);

  return createPortal(
    <Box
      onMouseDown={pickUpShip}
      ref={ref}
      sx={{
        position: 'absolute',
        top: shipPosition.y,
        left: shipPosition.x,
        background: 'red',
        width,
        height,
        cursor: 'grab',
        transition: 'all 0.05s ease-in-out',
      }}
    ></Box>,
    document.getElementById('fleet-root') as HTMLElement,
  );
}
