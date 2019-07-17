import './CabinetWrapper.less';

import React from 'react';

import Header from '../../components/cabinet/Header/Header';
import { classNames } from '../../utils';


function CabinetWrapper({ children, className }) {
  const mainClassName = classNames({
    CabinetWrapper: true,
    [className]: !!className,
  });

  return (
    <div className={mainClassName}>

      <Header />

      {children}

    </div>
  )
}

export default React.memo(CabinetWrapper);