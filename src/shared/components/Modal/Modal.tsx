import React from 'react';
import ReactDOM from 'react-dom';

import Backdrop from '../Backdrop/Backdrop';
import Button from '../Button/Button';
import Card from '../Card/Card';

import { ReactComponent as Icon } from 'assets/svg/clear.svg';

import styles from './Modal.module.scss';

interface Props {
  onClose?: () => void;
  onProceed?: () => void;
  onProceedText?: string;
  onReject?: () => void;
  onRejectText?: string;
}

const Modal: React.FC<Props> = ({
  children,
  onClose,
  onProceed,
  onProceedText = 'Proceed',
  onReject,
  onRejectText = 'Reject',
}) => {
  return ReactDOM.createPortal(
    <>
      <Backdrop onClick={onClose} />
      <Card center className={styles.modal}>
        {onClose && (
          <button className={styles.closeButton} onClick={onClose}>
            <Icon />
          </button>
        )}
        <h1 className={styles.text}>{children}</h1>
        <div className={styles.controls}>
          {onProceed && (
            <Button className={styles.button} onClick={onProceed}>
              {onProceedText}
            </Button>
          )}
          {onReject && (
            <Button className={styles.button} onClick={onReject}>
              {onRejectText}
            </Button>
          )}
        </div>
      </Card>
    </>,
    document.getElementById('modal-hook')!,
  );
};

export default Modal;
