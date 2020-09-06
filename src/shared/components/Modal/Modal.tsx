import React from 'react';
import ReactDOM from 'react-dom';

import Backdrop from '../Backdrop/Backdrop';
import Button from '../Button/Button';
import Card from '../Card/Card';

import styles from './Modal.module.scss';

interface Props {
  onClose?: () => void;
  onCloseText?: string;
  onProceed?: () => void;
  onProceedText?: string;
  onReject?: () => void;
  onRejectText?: string;
}

const Modal: React.FC<Props> = ({
  children,
  onClose,
  onCloseText = 'Close',
  onProceed,
  onProceedText = 'Proceed',
  onReject,
  onRejectText = 'Reject',
}) => {
  return ReactDOM.createPortal(
    <>
      <Backdrop onClick={onClose} />
      <Card center className={styles.Modal}>
        <h1 className={styles.Text}>{children}</h1>
        <div className={styles.Controls}>
          {onClose && (
            <Button className={styles.Button} onClick={onClose}>
              {onCloseText}
            </Button>
          )}
          {onProceed && (
            <Button className={styles.Button} onClick={onProceed}>
              {onProceedText}
            </Button>
          )}
          {onReject && (
            <Button className={styles.Button} onClick={onReject}>
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
