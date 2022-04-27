import React from 'react';
import { classNames as cn } from 'src/ui/utils';

import './CabinetBlock.less';

function CabinetBlock({ children, border, className = '' }) {
  const classNames = cn({ CabinetBlock: true, border, [className]: true });

  return <div className={classNames}>{children}</div>;
}

export default CabinetBlock;
