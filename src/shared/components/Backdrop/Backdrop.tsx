import React from 'react';

import styles from './Backdrop.module.scss';

const Backdrop: React.FC<any> = ({ ...rest }) => {
  return <div {...rest} className={styles.Backdrop}></div>;
};

export default Backdrop;
