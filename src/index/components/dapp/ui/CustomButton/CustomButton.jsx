import React from 'react';
import PropTypes from 'prop-types';

// Utils
import { classNames } from 'utils';

// Styles
import './CustomButton.less';

function CustomButton({ children, className, onClick, style, disabled }) {
  return (
    <button
      className={classNames({
        CustomButton: true,
        [className]: className,
        disabled,
      })}
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

CustomButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object,
  disabled: PropTypes.bool,
};

CustomButton.defaultProps = {
  className: null,
  onClick: () => {},
  style: {},
  disabled: false,
};

export default CustomButton;
