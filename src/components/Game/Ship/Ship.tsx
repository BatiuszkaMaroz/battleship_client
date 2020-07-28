import React, { useRef, useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';

import useTypedSelector from '../../../shared/hooks/useTypedSelector';

import styles from './Ship.module.scss';

const Ship: React.FC = () => {
  const [unlocked, setUnlocked] = useState<boolean>(false);
  const [curCell, setCurCell] = useState<null | HTMLDivElement>(null);
  const shipRef = useRef<HTMLDivElement | null>(null);
  const board = useTypedSelector((state) => state.board);

  const [clickCoords, setClickCoords] = useState<{
    left: number | null;
    top: number | null;
  }>({
    left: null,
    top: null,
  });

  const dragStart = (e: React.MouseEvent) => {
    setUnlocked(true);

    const ship = shipRef.current!;

    const { x, y } = ship.getBoundingClientRect();
    const { clientX, clientY } = e;

    const left = clientX - x;
    const top = clientY - y;

    document.body.append(shipRef.current!);
    ship.style.left = clientX - left + 'px';
    ship.style.top = clientY - top + 'px';

    setClickCoords({ left, top });
  };

  const dragEnd = useCallback(() => {
    setUnlocked(false);
  }, [setUnlocked]);

  const moveShip = useCallback(
    (e: MouseEvent) => {
      if (!unlocked) return;

      const ship = shipRef.current!;
      const { clientX, clientY } = e;

      ship.style.top = clientY - clickCoords.top! + 'px';
      ship.style.left = clientX - clickCoords.left! + 'px';

      const { x, y } = ship.getBoundingClientRect();
      const cell = document
        .elementFromPoint(x + 25, y + 25)
        ?.closest('.cell') as HTMLDivElement;

      if (cell) {
        const i = +cell.getAttribute('data-row')!;
        const j = +cell.getAttribute('data-col')!;

        const { top, left } = cell.getBoundingClientRect();

        ship.style.top = top + 'px';
        ship.style.left = left + 'px';

        setCurCell(cell);
      } else {
        setCurCell(null);
      }
    },
    [unlocked, clickCoords.left, clickCoords.top, board],
  );

  useEffect(() => {
    if (unlocked) {
      shipRef.current!.style.pointerEvents = 'none';
      window.addEventListener('mousemove', moveShip);
      window.addEventListener('mouseup', dragEnd);
    } else {
      shipRef.current!.style.top = 0 + 'px';
      shipRef.current!.style.left = 0 + 'px';

      curCell?.append(shipRef.current!);

      shipRef.current!.style.pointerEvents = '';
    }

    return () => {
      window.removeEventListener('mousemove', moveShip);
      window.removeEventListener('mouseup', dragEnd);
    };
  }, [unlocked, moveShip, dragEnd, curCell]);

  return ReactDOM.createPortal(
    <div ref={shipRef} onMouseDown={dragStart} className={styles.Ship}>
      <div className={styles.Segment}>1</div>
      <div className={styles.Segment}>2</div>
    </div>,
    document.querySelector('body')!,
  );
};

export default Ship;
