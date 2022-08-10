import React from 'react';
import PropTypes from 'prop-types';

// Components
import { Col } from 'src/ui';

// Styles
import './InfoWrapper.less';

function InfoWrapper({ children, size, type, padding }) {
  return (
    <Col
      alignItems="center"
      justifyContent="center"
      className={`DepositModal__InfoWrapper ${size} ${type}`}
      style={{ padding: padding && padding }}
    >
      {children}
    </Col>
  );
}

InfoWrapper.propTypes = {
  size: PropTypes.string,
  type: PropTypes.string,
  padding: PropTypes.string,
};

InfoWrapper.defaultProps = {
  size: 'medium',
  type: 'default',
  padding: null,
};

export default InfoWrapper;
