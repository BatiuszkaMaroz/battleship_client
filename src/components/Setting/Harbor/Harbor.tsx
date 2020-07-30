import React from 'react';

import Dock from '../Dock/Dock';

import useTypedSelector from '../../../shared/hooks/useTypedSelector';
import styles from './Harbor.module.scss';

const Harbor: React.FC = () => {
  const ships = useTypedSelector((state) => state.ships);

  return (
    <div className={styles.Harbor}>
      {ships.map((ship) => (
        <Dock key={ship.id} shipId={ship.id} />
      ))}
    </div>
  );
};

export default Harbor;
