import React, { useRef } from 'react';

import Ship from '../Ship/Ship';

import styles from './ShipCell.module.scss';

interface Props {
  shipId: string;
}

const ShipCell: React.FC<Props> = ({ shipId }) => {
  const shipCellRef = useRef<null | HTMLDivElement>(null);

  return (
    <div className={styles.ShipCell} ref={shipCellRef}>
      {shipCellRef.current && (
        <Ship id={shipId} homeCell={shipCellRef.current!} />
      )}
    </div>
  );
};

export default ShipCell;
