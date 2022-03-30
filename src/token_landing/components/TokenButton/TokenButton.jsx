import React from 'react';
import Button from 'src/ui/components/Button/Button';

import './TokenButton.less';

function TokenButton({ children, className, type }) {
  return (
    <Button type={type} className={className}>
      {children}
    </Button>
  );
}

export default TokenButton;
