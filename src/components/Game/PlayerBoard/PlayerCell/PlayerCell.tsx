import React from 'react';
import styles from './PlayerCell.module.scss';

type Props = {
  hit: boolean;
  shipId?: string;
  className: string;
};

const Cell: React.FC<Props> = ({ hit, shipId, className }) => {
  const renderContent = () => {
    if (shipId) {
      if (hit) {
        return shipId + 'HIT!';
      } else {
        return shipId;
      }
    }

    if (hit) {
      return 'HIT!';
    }

    return null;
  };

  return (
    <div className={`${styles.PlayerCell} ${className}`}>{renderContent()}</div>
  );
};

export default Cell;
