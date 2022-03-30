import React from 'react';
import PropTypes from 'prop-types';

import Button from 'src/ui/components/Button/Button';

import './TokenButton.less';

function TokenButton({ children, className, type, onClick }) {
  return (
    <Button type={type} onClick={onClick} className={className}>
      {children}
    </Button>
  );
}

TokenButton.defaultProps = {
  children: '',
  className: '',
  type: 'default',
  onClick: () => {},
};

TokenButton.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
};

export default TokenButton;
