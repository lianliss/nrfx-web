import React from 'react';
import PropTypes from 'prop-types';

import './DynamicShadow.less';

function DynamicShadow({ children, opacity, top, blur }) {
  return (
    <div className="DynamicShadow">
      <div className="DynamicShadow__children">
        {children}
        <div
          className="DynamicShadow__shadow"
          style={{ opacity, top, filter: blur && `blur(${blur})` }}
        />
      </div>
    </div>
  );
}

DynamicShadow.propTypes = {
  opacity: PropTypes.number,
  top: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  blue: PropTypes.number,
};

DynamicShadow.defaultProps = {
  opacity: null,
  top: null,
  blue: null,
};

export default DynamicShadow;
