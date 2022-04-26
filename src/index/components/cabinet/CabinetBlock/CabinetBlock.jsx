import React from 'react';
import { classNames } from 'src/ui/utils';

import './CabinetBlock.less';

function CabinetBlock({ children, border }) {
  const className = classNames({ CabinetBlock: true, border });

  return <div className={className}>{children}</div>;
}

export default CabinetBlock;
