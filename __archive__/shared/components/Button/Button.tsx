import React, { useRef } from 'react';

import styles from './Button.module.scss';

interface Props {
  className?: string;
  [x: string]: any;
}

const Button: React.FC<Props> = ({ className = '', children, ...rest }) => {
  const lastRipple = useRef<any>(null);

  const animateDown = (e: React.MouseEvent) => {
    const button = e.currentTarget as HTMLButtonElement;

    const { x, y } = button.getBoundingClientRect();
    const { clientX, clientY } = e;

    const left = clientX - x;
    const top = clientY - y;

    const ripple = document.createElement('div');
    ripple.className = `${styles.ripple} ${styles.rippleDown}`;
    ripple.style.left = left + 'px';
    ripple.style.top = top + 'px';

    button.append(ripple);

    const rippleObject = {
      ripple,
      animationend: false,
    };

    ripple.addEventListener('animationend', () => {
      rippleObject.animationend = true;
    });

    lastRipple.current = rippleObject;
  };

  const animateUp = (e: React.MouseEvent) => {
    const animationTime = 300;

    if (!lastRipple.current) {
      return;
    }

    const { ripple, animationend } = lastRipple.current as {
      ripple: HTMLDivElement;
      animationend: boolean;
    };
    if (animationend) {
      ripple.className = `${styles.ripple} ${styles.rippleUp}`;
      setTimeout(() => {
        ripple.remove();
      }, animationTime);
    } else {
      ripple.addEventListener('animationend', () => {
        ripple.className = `${styles.ripple} ${styles.rippleUp}`;
        setTimeout(() => {
          ripple.remove();
        }, animationTime);
      });
    }
  };

  return (
    <button className={`${styles.button} ${className}`} {...rest}>
      <div className={styles.text}>{children}</div>
      <div
        onMouseDown={animateDown}
        onMouseUp={animateUp}
        onMouseLeave={animateUp}
        className={`${styles.rippleContainer}`}
      ></div>
    </button>
  );
};

export default Button;
