import React from 'react';
import PropTypes from 'prop-types';

// Components
import { Col } from 'src/ui';

// Styles
import './InfoWrapper.less';

function InfoWrapper({ children, size, type }) {
  return (
    <Col
      alignItems="center"
      justifyContent="center"
      className={`DepositModal__InfoWrapper ${size} ${type}`}
    >
      {children}
    </Col>
  );
}

InfoWrapper.propTypes = {
  size: PropTypes.string,
  type: PropTypes.string,
};

InfoWrapper.defaultProps = {
  size: 'medium',
  type: 'default',
};

export default InfoWrapper;
