import React from 'react';

import './Spinner.scss';

interface IProps {
  className?: string;
}

const Spinner: React.FC<IProps> = ({ className = '', ...rest }) => {
  return (
    <div className={`container ${className}`} {...rest}>
      <div className='sk-chase'>
        <div className='sk-chase-dot'></div>
        <div className='sk-chase-dot'></div>
        <div className='sk-chase-dot'></div>
        <div className='sk-chase-dot'></div>
        <div className='sk-chase-dot'></div>
        <div className='sk-chase-dot'></div>
      </div>
    </div>
  );
};

export default Spinner;
