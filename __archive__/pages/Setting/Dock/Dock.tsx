import React, { useEffect, useMemo, useRef, useState } from 'react';

import Ship from '../Ship/Ship';

import styles from './Dock.module.scss';

interface Props {
  shipId: string;
}

const Dock: React.FC<Props> = ({ shipId }) => {
  const [settled, setSettled] = useState<boolean>(false);
  const dockRef = useRef<null | HTMLDivElement>(null);

  const spawnShip = useMemo(() => {
    if (settled && dockRef.current) {
      return <Ship shipId={shipId} dock={dockRef.current} />;
    } else {
      return null;
    }
  }, [settled, shipId]);

  useEffect(() => {
    if (dockRef.current) {
      setSettled(true);
    }
  }, [setSettled]);

  return (
    <div ref={dockRef} className={styles.Dock}>
      {spawnShip}
    </div>
  );
};

export default Dock;
