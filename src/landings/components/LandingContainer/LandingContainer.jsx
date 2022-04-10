import React from 'react';
import PropTypes from 'prop-types';

import './LandingContainer.less';

function LandingContainer({ children, className }) {
  return (
    <div className={`LandingContainer${className && ' ' + className}`}>
      {children}
    </div>
  );
}

LandingContainer.propTypes = {
  className: PropTypes.string,
};

LandingContainer.defaultProps = {
  className: '',
};

export default LandingContainer;
