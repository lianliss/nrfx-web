import React from 'react';
import PropTypes from 'prop-types';

// Components
import { Col } from 'src/ui';

// Utils
import { classNames as cn } from 'src/utils';

// Styles
import './InfoWrapper.less';

function InfoWrapper({ children, size, type, padding }) {
  return (
    <Col
      alignItems="center"
      justifyContent="center"
      className={cn(
        'DepositModal__InfoWrapper',
        { [type]: type },
        { [size]: size }
      )}
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
