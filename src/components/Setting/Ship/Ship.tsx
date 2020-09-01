import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { useDispatch } from 'react-redux';

import isPlaceFree from '../../../shared/utils/isPlaceFree';
import useTypedSelector from '../../../shared/hooks/useTypedSelector';
import { setShip, unsetShip } from '../../../store/actions/setting';

import styles from './Ship.module.scss';

interface Props {
  dock: HTMLDivElement;
  shipId: string;
}

const Ship: React.FC<Props> = ({ dock, shipId }) => {
  const dispatch = useDispatch();
  const [render, setRender] = useState<boolean>(false);

  const { id, size } = useTypedSelector((state) =>
    state.ships.find((ship) => ship.id === shipId),
  )!;
  const board = useTypedSelector((state) => state.board);

  const orientation = useRef<'horizontal' | 'vertical'>('horizontal');
  const shipRef = useRef<HTMLDivElement | null>(null);
  const curPlace = useRef<HTMLDivElement>(dock);
  const inMotion = useRef<boolean>(false);
  const clickCoords = useRef<{
    left: number | null;
    top: number | null;
  }>({ left: null, top: null });

  const rotateShip = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (curPlace.current === dock || size === 1) return;

      const row = +curPlace.current.getAttribute('data-row')!;
      const col = +curPlace.current.getAttribute('data-col')!;
      const ship = shipRef.current!;

      if (orientation.current === 'horizontal') {
        if (isPlaceFree(row, col, board, size, shipId, 'vertical')) {
          orientation.current = 'vertical';
          ship.style.flexFlow = 'column';

          dispatch(setShip(shipId, size, row, col, 'vertical'));
        } else {
          console.log('SHIT');
        }
      } else if (orientation.current === 'vertical') {
        if (isPlaceFree(row, col, board, size, shipId, 'horizontal')) {
          orientation.current = 'horizontal';
          ship.style.flexFlow = 'row';

          dispatch(setShip(shipId, size, row, col, 'horizontal'));
        } else {
          console.log('SHIT');
        }
      }
    },
    [dock, size, board, shipId, dispatch],
  );

  const pickUpShip = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return;

    inMotion.current = true;

    const ship = shipRef.current!;

    const { x, y } = ship.getBoundingClientRect();
    const { clientX, clientY } = e;

    const left = clientX - x;
    const top = clientY - y;

    document.body.append(shipRef.current!);
    ship.style.left = clientX - left + 'px';
    ship.style.top = clientY - top + 'px';

    clickCoords.current = { left, top };

    setRender((prev) => !prev);
  }, []);

  const dropShip = useCallback(() => {
    if (curPlace.current !== dock) {
      const row = +curPlace.current.getAttribute('data-row')!;
      const col = +curPlace.current.getAttribute('data-col')!;

      dispatch(setShip(id, size, row, col, orientation.current));
    } else {
      dispatch(unsetShip(id));
    }

    inMotion.current = false;
    clickCoords.current = { left: null, top: null };

    setRender((prev) => !prev);
  }, [dispatch, id, size, dock]);

  const moveShip = useCallback(
    (e: MouseEvent) => {
      if (!inMotion.current) return;

      const ship = shipRef.current!;
      const { clientX, clientY } = e;

      ship.style.top = clientY - clickCoords.current.top! + 'px';
      ship.style.left = clientX - clickCoords.current.left! + 'px';

      const { x, y } = ship.getBoundingClientRect();
      const cell = document
        .elementFromPoint(x + 25, y + 25)
        ?.closest('.cell') as HTMLDivElement;

      if (cell) {
        const row = +cell.getAttribute('data-row')!;
        const col = +cell.getAttribute('data-col')!;

        if (
          curPlace.current === cell ||
          isPlaceFree(row, col, board, size, id, orientation.current)
        ) {
          const { top, left } = cell.getBoundingClientRect();

          ship.style.top = top + 'px';
          ship.style.left = left + 'px';

          if (curPlace.current !== cell) {
            curPlace.current = cell;
          }
        } else {
          if (curPlace.current !== dock) {
            curPlace.current = dock;
          }
        }
      } else {
        if (curPlace.current !== dock) {
          curPlace.current = dock;
        }
      }
    },
    [dock, id, board, size],
  );

  useEffect(() => {
    if (inMotion.current) {
      shipRef.current!.style.pointerEvents = 'none';
      window.addEventListener('mousemove', moveShip);
      window.addEventListener('mouseup', dropShip);
    } else {
      shipRef.current!.style.top = 0 + 'px';
      shipRef.current!.style.left = 0 + 'px';
      shipRef.current!.style.pointerEvents = '';
    }

    return () => {
      window.removeEventListener('mousemove', moveShip);
      window.removeEventListener('mouseup', dropShip);
    };
  }, [moveShip, dropShip, render]);

  useEffect(() => {
    let boardCell: any;

    board.forEach((row) => {
      if (boardCell) return;

      row.forEach((cell) => {
        if (boardCell) return;

        if (cell.shipId === shipId) {
          boardCell = cell;
        }
      });
    });

    shipRef.current!.style.left = '0px';
    shipRef.current!.style.top = '0px';

    if (!boardCell) {
      if (shipRef.current!.parentElement !== dock) {
        orientation.current = 'horizontal';
        shipRef.current!.style.flexFlow = 'row';
        dock.append(shipRef.current!);
      }
      return;
    }

    if (
      size !== 1 &&
      board[boardCell.row + 1] &&
      board[boardCell.row + 1][boardCell.col] &&
      board[boardCell.row + 1][boardCell.col].shipId === shipId
    ) {
      orientation.current = 'vertical';
      shipRef.current!.style.flexFlow = 'column';
    } else {
      orientation.current = 'horizontal';
      shipRef.current!.style.flexFlow = 'row';
    }

    const cell = document.querySelector(
      `#cell-${boardCell.id}`,
    ) as HTMLDivElement | null;

    if (cell) {
      curPlace.current = cell;
      cell.style.zIndex = '100';

      if (shipRef.current!.parentElement !== cell) {
        cell.append(shipRef.current!);
      }
    } else {
      if (shipRef.current!.parentElement !== dock) {
        dock.append(shipRef.current!);
      }
    }

    return () => {
      if (cell) {
        cell.style.zIndex = '';
      }
    };
  }, [board, shipId, dock, size]);

  const shipBody = useMemo(() => {
    const body = [];
    for (let i = 0; i < size; i++) {
      body.push(<div key={i} className={styles.Segment}></div>);
    }
    return body;
  }, [size]);

  return (
    <div
      onContextMenu={rotateShip}
      ref={shipRef}
      onMouseDown={pickUpShip}
      className={styles.Ship}
    >
      {shipBody}
    </div>
  );
};

export default Ship;
