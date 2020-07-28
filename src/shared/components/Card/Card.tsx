import React from 'react';
import styles from './Card.module.scss';

interface Props {
  className?: string;
  center?: boolean;
}

const Card: React.FC<Props> = ({
  children,
  center,
  className = '',
  ...rest
}) => {
  return (
    <div
      className={`${styles.Card} ${center && styles.Center} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Card;
