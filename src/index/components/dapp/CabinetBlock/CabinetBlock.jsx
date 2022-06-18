import React from 'react';
import { classNames as cn } from 'src/ui/utils';

import './CabinetBlock.less';

function CabinetBlock({ children, border, className = '', ...props }) {
  const classNames = cn({ CabinetBlock: true, border, [className]: true });

  return (
    <div className={classNames} {...props}>
      {children}
    </div>
  );
}

export default CabinetBlock;
