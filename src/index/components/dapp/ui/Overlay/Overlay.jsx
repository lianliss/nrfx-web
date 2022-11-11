import React from 'react';
import PropTypes from 'prop-types';
import { classNames } from 'utils';

// Styles
import './Overlay.less';

function Overlay({ children, backdropFilter, background, className }) {
  return (
    <div
      className={classNames({ DappUI__Overlay: true, [className]: className })}
    >
      <div
        className="DappUI__Overlay__bg"
        style={{ backdropFilter, background }}
      />
      <div className="DappUI__Overlay__container">{children}</div>
    </div>
  );
}

Overlay.propTypes = {
  backdropFilter: PropTypes.string,
  background: PropTypes.string,
  className: PropTypes.string,
};

Overlay.defaultProps = {
  backdropFilter: null,
  background: null,
  className: null,
};

export default Overlay;
