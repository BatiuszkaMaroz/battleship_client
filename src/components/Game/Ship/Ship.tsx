import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';

import useTypedSelector from '../../../shared/hooks/useTypedSelector';
import { setCurrentCell } from '../../../store/actions/ships';

import styles from './Ship.module.scss';

interface Props {
  id: string;
  homeCell?: HTMLDivElement;
}

const Ship: React.FC<Props> = ({ id, homeCell }) => {
  const dispatch = useDispatch();
  const [inMotion, setInMotion] = useState<boolean>(false);
  const shipRef = useRef<null | HTMLDivElement>(null);

  const board = useTypedSelector((state) => state.board);
  const { currentCell, orientation, settled, size } = useTypedSelector(
    (state) => state.ships.find((ship) => ship.id === id)!,
  );

  const [clickCoords, setClickCoords] = useState<{
    left: number | null;
    top: number | null;
  }>({
    left: null,
    top: null,
  });

  const motionStart = (e: React.MouseEvent) => {
    setInMotion(true);

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

  const motionEnd = useCallback(() => {
    setInMotion(false);
  }, [setInMotion]);

  const moveShip = useCallback(
    (e: MouseEvent) => {
      if (!inMotion) return;

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

        dispatch(setCurrentCell(id, cell));
      } else {
        dispatch(setCurrentCell(id, homeCell!));
      }
    },
    [inMotion, clickCoords.left, clickCoords.top, dispatch, id, homeCell],
  );

  useEffect(() => {
    if (inMotion) {
      shipRef.current!.style.pointerEvents = 'none';
      window.addEventListener('mousemove', moveShip);
      window.addEventListener('mouseup', motionEnd);
    } else {
      shipRef.current!.style.top = '';
      shipRef.current!.style.left = '';
      shipRef.current!.style.pointerEvents = '';
    }

    return () => {
      window.removeEventListener('mousemove', moveShip);
      window.removeEventListener('mouseup', motionEnd);
    };
  }, [inMotion, moveShip, motionEnd]);

  useEffect(() => {
    if (currentCell && !inMotion) {
      currentCell.append(shipRef.current!);
    }
  }, [currentCell, inMotion]);

  useEffect(() => {
    if (orientation === 'horizontal') {
      shipRef.current!.style.flexFlow = 'row';
    } else {
      shipRef.current!.style.flexFlow = 'column';
    }
  }, [orientation]);

  useEffect(() => {
    dispatch(setCurrentCell(id, homeCell!));
  }, [dispatch, homeCell, id]);

  const segments = () => {
    const shipBody: any[] = [];

    for (let i = 0; i < size; i++) {
      shipBody.push(<div key={i} className={styles.Segment}></div>);
    }

    return shipBody;
  };

  return ReactDOM.createPortal(
    <div onMouseDown={motionStart} ref={shipRef} className={styles.Ship}>
      {segments()}
    </div>,
    document.body,
  );
};

export default Ship;
