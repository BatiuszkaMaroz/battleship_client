import React from 'react';
import styles from './Card.module.scss';

interface CardProps {
  className?: string;
  center?: boolean;
}

const Card = ({
  children,
  center,
  className = '',
  ...rest
}: React.PropsWithChildren<CardProps>) => {
  return (
    <div
      className={`${styles.card} ${center && styles.center} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Card;
