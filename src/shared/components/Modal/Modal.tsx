import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';

import Backdrop from '../Backdrop/Backdrop';
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
        <p>{children}</p>
        {onClose && <button onClick={onClose}>{onCloseText}</button>}
        {onProceed && <button onClick={onProceed}>{onProceedText}</button>}
        {onReject && <button onClick={onReject}>{onRejectText}</button>}
      </Card>
    </>,
    document.getElementById('modal-hook')!,
  );
};

export default Modal;
