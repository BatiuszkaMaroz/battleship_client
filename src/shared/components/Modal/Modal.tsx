import React from 'react';
import ReactDOM from 'react-dom';

import Backdrop from '../Backdrop/Backdrop';
import Card from '../Card/Card';

import styles from './Modal.module.scss';

interface Props {
  onClick?: () => void;
}

const Modal: React.FC<Props> = ({ children, onClick }) => {
  return ReactDOM.createPortal(
    <>
      <Backdrop onClick={onClick} />
      <Card center className={styles.Modal}>
        <p>{children}</p>
        <button onClick={onClick}>Ok</button>
      </Card>
    </>,
    document.getElementById('modal-hook')!,
  );
};

export default Modal;
